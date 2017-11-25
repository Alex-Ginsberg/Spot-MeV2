import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {me} from '../store'
import axios from 'axios'

class AddFriends extends React.Component{

    constructor() {
        super()
        this.state = {
            allUsers: [],
            sentRequests: []
        }
    }

    componentDidMount() {
        this.props.isLoggedIn()
        axios.get('/api/users')
            .then(res => res.data)
            .then(users => {
                axios.get('/api/request')
                    .then(res => res.data)
                    .then(requests => {
                        const sent = []
                        for (let i = 0; i < requests.length; i++) {
                            sent.push(requests[i].userId)
                        }
                        this.setState({allUsers: users, sentRequests: sent})
                    })
                
            })
    }

    render() {
        const users = this.state.allUsers.filter(user => user.id !== this.props.user.id)
        return (
            <div>
                <h1>Add Friends</h1>
                {users.map(user => (
                    <div className="friend" key={user.id}>
                        <p>{user.name}</p>
                        <img src={user.proPic} />
                        {!this.state.sentRequests.includes(user.id) ? <button onClick={(e) => {
                            axios.post(`/api/request/${user.id}`, {id: this.props.user.id})
                            const oldRequests = this.state.sentRequests
                            oldRequests.push(user.id)
                            this.setState({sentRequests: oldRequests})
                        }}>Send Friend Request</button> : <button disabled>Request pending</button>}
                    </div>
                ))}
            </div>
      )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    isLoggedIn() {
        dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(AddFriends))
