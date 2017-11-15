import axios from 'axios'

/*
    ACTION TYPES
*/
const POST_CHAT = 'POST_CHAT'

/*
    ACTION CREATORS
*/
const newChat = chat => ({
    type: POST_CHAT,
    chat
})

/*
    THUNK MIDDLEWARE
*/
export const postChat = chat => 
    dispatch => {
        axios.post('/api/chat', chat)
            .then(res => res.data)
            .then(chat => console.log(chat))
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
