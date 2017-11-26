import axios from 'axios'

/*
    ACTION TYPES
*/
const POST_CHAT = 'POST_CHAT'
const GET_CHATS = 'GET_CHATS'

/*
    ACTION CREATORS
*/
const newChat = chat => ({
    type: POST_CHAT,
    chat
})

const getChats = chats => ({
    type: GET_CHATS,
    chats
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

export const fetchChats = () => 
    dispatch => {
        axios.get(`/api/chat`)
            .then(res => res.data)
            .then(chats => dispatch(getChats(chats)))
    }

/*
    REDUCER
*/
export default function (state = [], action) {
    switch (action.type) {
        case GET_CHATS:
            return action.chats
        default:
            return state
    }
}
