import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Profile, SingleChat} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {
  render () {

    return (
      <Router history={history}>
      <div>
        <Main />   
          <Switch>
            <Route exact path='/profile' component={Profile} />
            <Route path='/singlechat/:id' component={SingleChat} />
          </Switch>
      </div>
      </Router>
    )
  }
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

export default connect(mapState, mapDispatch)(Routes)


