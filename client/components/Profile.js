import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {me, postChat} from '../store'

class Profile extends React.Component{
  constructor() {
    super()
    this.state = {
      formName: '',
      formLikesNeeded: 0,
    }
  }

  componentDidMount() {
    this.props.isLoggedIn()
  }


  render(){
    const {user} = this.props

    return (
      <div>
        {user.id && 
        <div>
            <p>{user.name}</p>
            <img src={user.proPic} />
            <form onSubmit={(e) => {
              e.preventDefault()
              this.props.makeNewChat({
                name: this.state.formName,
                externalUrl: 'To Fill In',
                playistId: 'to fill in',
                likesNeeded: this.state.formLikesNeeded,
                userId: this.props.user.id
              })
            }}>
            <div className="form-group">
              <label htmlFor="name">Create a new music group!</label>
              <input className="form-control" type="text" name="playlistName" placeholder="Enter playlist name" onChange={(e) => this.setState({formName: e.target.value})} />
              <input className="form-control" type="number" name="likesNeeded" placeholder="Enter likes needed for a song to be added" onChange={(e) => this.setState({formLikesNeeded: e.target.value})} />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-default">Submit Music Group</button>
            </div>
            </form>
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
