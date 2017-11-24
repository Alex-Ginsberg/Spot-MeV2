import axios from 'axios'

/*
    ACTION TYPES
*/
const GET_SONGS = 'GET_SONGS'
const POST_SONG = 'POST_SONG'

/*
    ACTION CREATORS
*/
const getSongs = songs => ({
    type: GET_SONGS,
    songs
})

const newSong = song => ({
    type: POST_SONG,
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
                    .then(postedSongData => dispatch(newSong(postedSongData[0])))

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
        default:
            return state
    }
}
