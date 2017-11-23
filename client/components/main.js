import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {me} from '../store'

class Main extends React.Component{
  componentDidMount() {
    this.props.isLoggedIn()   
  }


  render(){
    const test = "Zedd.mp4"
    return (
      <div className="fullscreen-bg">
          <video loop muted autoPlay className="fullscreen-bg__video">
            <source src={test} type="video/mp4" />
          </video>
          <h1 className="heading">Spot-Me</h1>
          <h3 className="heading">Bringing people together through music</h3>

        {!this.props.user.id && <a href="/auth/spotify">Login with Spotify</a>}
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
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))
