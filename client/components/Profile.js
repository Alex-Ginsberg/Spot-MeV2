import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {me, postChat, refresh, fetchFriends} from '../store'
import axios from 'axios'
import {MyChats} from './index'

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
    this.props.refreshToken()
    this.props.fetchFriends()
  }


  render(){
    const {user, friends} = this.props
    return (
      <div>
        {user.id && 
        <div>
            <p className="profile-heading">Welcome back, {user.name}!</p>
            <div className="columns">
              <div className="col-left">
                <img src={user.proPic} className="profile-pic" />
              </div>
              <div className="col-right">
                <Link to={'/addfriends'}><button className="btn">Add Friends</button></Link>
                <h3>Your Friends</h3>
                {friends.map(friend => (
                  <div key={friend.id}>
                    <img className="friend-icon" src={friend.proPic} />
                    <p className="friend-text">{friend.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-box">
            <form onSubmit={(e) => {
              e.preventDefault()
              const jsonData = {
                name: this.state.formName,
                public: false,
                collaborative: true
              }

              axios({
                method: 'post',
                url: `https://api.spotify.com/v1/users/${user.SpotifyId}/playlists`,
                data: jsonData,
                dataType: 'json',
                headers: {
                  'Authorization': 'Bearer ' + user.accessToken,
                  'Content-Type': 'application/json'
                }
              })
                .then(res => {
                  console.log(res.data)
                  this.props.makeNewChat({
                    name: this.state.formName,
                    externalUrl: res.data.external_urls.spotify,
                    playlistId: res.data.id,
                    likesNeeded: this.state.formLikesNeeded,
                    userId: user.id
                  })
                })
                .catch(err => {
                  console.log('There was an error: ', err)
                })
            }}>
            <div className="form-group">
              <label htmlFor="name">Create a new music group!</label>
              <input className="form-control" type="text" name="playlistName" placeholder="Enter playlist name" onChange={(e) => this.setState({formName: e.target.value})} />
              <input className="form-control" type="number" name="likesNeeded" placeholder="Enter likes needed for a song to be added" onChange={(e) => this.setState({formLikesNeeded: e.target.value})} />
            </div>
            <div className="form-group">
                <button type="submit" className="btn">Submit Music Group</button>
            </div>
            </form>
          </div>
        </div>
        }
        <MyChats />
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
    friends: state.friends
  }
}

const mapDispatch = (dispatch) => {
  return {
    isLoggedIn() {
      dispatch(me())
    },
    makeNewChat(chat) {
        dispatch(postChat(chat))
    },
    refreshToken() {
      dispatch(refresh())
    },
    fetchFriends() {
      dispatch(fetchFriends())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Profile))
