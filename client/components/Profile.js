import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {me, postChat} from '../store'

class Profile extends React.Component{
  componentDidMount() {
    this.props.isLoggedIn()
    console.log('PRO')
  }


  render(){
    const {user} = this.props

    return (
      <div>
        {user.id && 
        <div>
            <p>{user.name}</p>
            <img src={user.proPic} />
            <button onClick={() => this.props.makeNewChat({
                name: "Test222",
                externalUrl: "sdfafdsf",
                playistId: "sfsdfafd",
                likesNeeded: 2,
                userId: 1
            })}>Make a new chat</button>
        </div>
        }
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    isLoggedIn() {
      dispatch(me())
    },
    makeNewChat(chat) {
        dispatch(postChat(chat))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Profile))
