import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios'



class AddToChat extends React.Component{
    render() {
        return (
            <div>
                <h1>Select Friends to Add</h1>
                {this.props.friends.map(friend => (
                    <div key={friend.id}>
                        <img className="friend-icon" src={friend.proPic} />
                        <p className="friend-text">{friend.name}</p>
                        <button onClick={() => {
                            axios.post('/api/chat/add', {userId: friend.id, chatId: this.props.match.params.id})
                        }}>Add</button>
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
    friends: state.friends
  }
}

const mapDispatch = (dispatch) => {
  return {
    
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(AddToChat))
