import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {me} from '../store'
import axios from 'axios'

class AddFriends extends React.Component{

    constructor() {
        super()
        this.state = {
            allUsers: []
        }
    }

    componentDidMount() {
        this.props.isLoggedIn()
        axios.get('/api/users')
            .then(res => res.data)
            .then(users => this.setState({allUsers: users}))
    }

    render() {
        const users = this.state.allUsers.filter(user => user.id !== this.props.user.id)
        console.log(users)
        return (
            <div>
                <h1>Add Friends</h1>
                {users.map(user => (
                    <div className="friend" key={user.id}>
                        <p>{user.name}</p>
                        <img src={user.proPic} />
                        <button>Add Friend</button>
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
