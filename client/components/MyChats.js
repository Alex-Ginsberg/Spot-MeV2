import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchChats} from '../store'
import axios from 'axios'

class MyChats extends React.Component{

  componentDidMount() {
    this.props.fetchChats()
  }

  render() {
      return (
        <div>
            {this.props.chats.map(chat => (
                <div key={chat.id}>
                    <a href={chat.externalUrl}>Play!</a>
                    <p>{chat.name}</p>
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
