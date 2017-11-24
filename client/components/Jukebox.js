import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {postSong} from '../store'


class Jukebox extends React.Component{

    constructor() {
        super()
        this.state = {
            songText: '',
            artistText: ''

        }
        this.handleSongSubmit = this.handleSongSubmit.bind(this)
    }

    componentDidMount() {
    
    }

    handleSongSubmit(e) {
        e.preventDefault()
        this.props.postSong(this.state.songText, this.state.artistText, this.props.user)
    }

    render() {
      return (
        <div>
           <h1>Jukebox</h1> 
           <form onSubmit={this.handleSongSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Submit a Song</label>
                    <input className="form-control" type="text" name="songName" placeholder="Enter song name" required 
                    onChange={(e) => this.setState({songText: e.target.value})} />
                    <input className="form-control" type="text" name="songArtist" placeholder="Enter artist" required  
                    onChange={(e) => this.setState({artistText: e.target.value})}/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Get Song</button>
                </div>
            </form>
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
    postSong(title, artist, user) {
        dispatch(postSong(title, artist, user))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Jukebox))
