import axios from 'axios'

/*
    ACTION TYPES
*/
const POST_SONG = 'POST_SONG'

/*
    ACTION CREATORS
*/
const newSong = song => ({
    type: POST_SONG,
    song
})


/*
    THUNK MIDDLEWARE
*/
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
            })
        
}


/*
    REDUCER
*/
export default function (state = [], action) {
    switch (action.type) {
        default:
            return state
    }
}
