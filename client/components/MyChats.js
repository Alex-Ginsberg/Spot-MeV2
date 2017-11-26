import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchChats} from '../store'

class MyChats extends React.Component{

  componentDidMount() {
    this.props.fetchChats()
  }

  render() {
      return (
        <div>
          <h2>Your Music-Groups</h2>
            {this.props.chats.map(chat => (
                <div key={chat.id}>
                    <a href={chat.externalUrl}><button className="btn">Open {chat.name} in Spotify</button></a>
                    <Link to={`/singlechat/${chat.id}`}>
                    <button className="btn-open">Open {chat.name}</button>
                    </Link>
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
    chats: state.chats
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchChats() {
        dispatch(fetchChats())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(MyChats))
