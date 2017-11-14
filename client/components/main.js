import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'

const Main = (props) => {


  return (
    <div>
      <a href="/auth/spotify">Login with Spotify</a>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    
  }
}

const mapDispatch = (dispatch) => {
  return {
    
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))
