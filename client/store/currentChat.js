import axios from 'axios'

/*
    ACTION TYPES
*/
const GET_CHAT = 'GET_CHAT'


/*
    ACTION CREATORS
*/
const getChat = chat => ({
    type: GET_CHAT,
    chat
})


/*
    THUNK MIDDLEWARE
*/
export const fetchChat = id => 
    dispatch => {
        axios.get(`/api/chat/${id}`)
            .then(res => res.data)
            .then(chat => dispatch(getChat(chat)))
}

/*
    REDUCER
*/
export default function (state = {}, action) {
    switch (action.type) {
        case GET_CHAT:
            return action.chat
        default:
            return state
    }
}
