import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios'



class AddToChat extends React.Component{
    constructor() {
        super()
        this.state = {
            members: [],
        }
    }

    componentDidMount() {
        axios.get(`/api/chat/members/${this.props.match.params.id}`)
            .then(res => res.data)
            .then(members => this.setState({members}))
    }

    render() {
        const friendsNotAdded = []
        if (this.state.members){
            const friendsIds = []
            for (let i = 0; i < this.state.members.length; i++) {
                friendsIds.push(this.state.members[i].id)
            }
            console.log(friendsIds)
            for (let i = 0; i < this.props.friends.length; i++) {
                if (!friendsIds.includes(this.props.friends[i].id)) {
                    friendsNotAdded.push(this.props.friends[i])
                }
            }
        }
        return (
            <div>
                <h1>Friends in Group</h1>
                {this.state.members.map(member => (
                    <div key={member.id}>
                        <img className="friend-icon" src={member.proPic} />
                        <p className="friend-text">{member.name}</p>
                    </div>
                ))}
                <h1>Select Friends to Add</h1>
                {friendsNotAdded.map(friend => (
                    <div key={friend.id}>
                        <img className="friend-icon" src={friend.proPic} />
                        <p className="friend-text">{friend.name}</p>
                        <button onClick={() => {
                            axios.post('/api/chat/add', {userId: friend.id, chatId: this.props.match.params.id})
                            const newFriends = this.state.members
                            newFriends.push(friend)
                            this.setState({members: newFriends})
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
