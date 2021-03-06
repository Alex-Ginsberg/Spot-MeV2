import axios from 'axios'
import socket from '../socket'

/*
    ACTION TYPES
*/
const GET_SONGS = 'GET_SONGS'
const POST_SONG = 'POST_SONG'
const NEW_LIKE = 'NEW_LIKE'

/*
    ACTION CREATORS
*/
const getSongs = songs => ({
    type: GET_SONGS,
    songs
})

export const newSong = song => ({
    type: POST_SONG,
    song
})

export const newLike = song => ({
    type: NEW_LIKE,
    song
})


/*
    THUNK MIDDLEWARE
*/
export const fetchSongs = chatId =>
    dispatch => {
        axios.get(`/api/song/${chatId}`)
            .then(res => res.data)
            .then(songs => dispatch(getSongs(songs)))
    }

export const postSong = (title, artist, user, chatId) => 
    dispatch => {
        axios({
            method: 'get',
            url: `https://api.spotify.com/v1/search?q=track:${title}%20artist:${artist}&type=track`,
            headers: {
                'Authorization': 'Bearer ' + user.accessToken,
            }
        })
            .then(res => {
                const song = res.data.tracks.items[0]
                axios.post('/api/song', {
                    name: song.name,
                    externalUrl: song.external_urls.spotify,
                    spotifyId: song.id,
                    previewUrl: song.preview_url,
                    uri: song.uri,
                    artist: song.artists[0].name,
                    image: song.album.images[0].url,
                    chatId: chatId
                })
                    .then(postedSong => postedSong.data)
                    .then(postedSongData => {
                        dispatch(newSong(postedSongData[0]))
                        socket.emit('new-song', postedSongData[0])
                    })
            })
}

export const putLike = id =>
    dispatch => {
        axios.put(`/api/song/${id}`)
            .then(res => res.data)
            .then(song => {
                socket.emit('new-like', song)
                dispatch(newLike(song))
            })
    }


/*
    REDUCER
*/
export default function (state = [], action) {
    switch (action.type) {
        case GET_SONGS:
            return action.songs
        case POST_SONG:
            return [...state, action.song]
        case NEW_LIKE:
            return Object.assign([], state, state.map(song => (song.id === action.song.id) ? action.song : song))
        default:
            return state
    }
}
