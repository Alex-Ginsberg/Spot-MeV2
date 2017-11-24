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
export const postSong = (title, artist, user) => 
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
                console.log(song)
                // Submit song to db
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
