import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { fetchChat } from '../store/currentChat';
import Messaging from './Messaging'
import axios from 'axios'

class SingleChat extends React.Component{
  constructor() {
    super()
    this.state = {
      owner: {}
    }
  }

  componentDidMount() {
    this.props.fetchChat(this.props.match.params.id)
  }

  render() {
      // Gets the info about the admin of the chat AFTER that currentChat has been set
      if (!this.state.owner.id && this.props.currentChat.userId){
        axios.get(`/api/users/${this.props.currentChat.userId}`)
          .then(res => res.data)
          .then(user => this.setState({owner: user}))
      }

      const {currentChat} = this.props
      const {owner} = this.state
      return (
        <div>
            <h1>{currentChat.name}</h1>
            <a href={currentChat.externalUrl}>Open in Spotify</a>
            <h3>Created by {owner.name}</h3>
            <img src={owner.proPic} />
            {currentChat.id && <Messaging chatId={currentChat.id} />}
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
    currentChat: state.currentChat
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchChat(id) {
      dispatch(fetchChat(id))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(SingleChat))
