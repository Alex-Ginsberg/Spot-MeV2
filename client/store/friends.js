import axios from 'axios'

/*
    ACTION TYPES
*/
const GET_FRIENDS = 'GET_FRIENDS'


/*
    ACTION CREATORS
*/
const getFriends = friends => ({
    type: GET_FRIENDS,
    friends
})


/*
    THUNK MIDDLEWARE
*/
export const fetchFriends = () => 
    dispatch => {
        axios.get('/api/friends')
            .then(res => res.data)
            .then(friends => dispatch(getFriends(friends)))
}

/*
    REDUCER
*/
export default function (state = [], action) {
    switch (action.type) {
        case GET_FRIENDS:
            return action.friends
        default:
            return state
    }
}
