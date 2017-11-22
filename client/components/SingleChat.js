import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { fetchChat } from '../store/currentChat';

class SingleChat extends React.Component{

  componentDidMount() {
    this.props.fetchChat(this.props.match.params.id)
  }

  render() {
      console.log(this.props.currentChat)
      return (
        <div>
            
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
