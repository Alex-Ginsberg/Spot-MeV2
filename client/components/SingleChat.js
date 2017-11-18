import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class SingleChat extends React.Component{

  componentDidMount() {
    
  }

  render() {
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
export default withRouter(connect(mapState, mapDispatch)(SingleChat))
