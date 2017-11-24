import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {postSong, fetchSongs} from '../store'


class Jukebox extends React.Component{

    constructor() {
        super()
        this.state = {
            songText: '',
            artistText: '',
            songPlaying: false

        }
        this.handleSongSubmit = this.handleSongSubmit.bind(this)
        this.audio = document.createElement('audio')
    }

    componentDidMount() {
        this.props.fetchSongs(this.props.match.params.id)
    }

    handleSongSubmit(e) {
        e.preventDefault()
        this.props.postSong(this.state.songText, this.state.artistText, this.props.user, this.props.currentChat.id)
    }

    render() {
        return (
            <div>
                <h1>Jukebox</h1> 
                {this.props.songs.map(song => (
                    <div className="song" key={song.id}>
                        <p>{song.name} - {song.artist}</p>
                        <img className="song-pic" src={song.image} />
                        {this.state.songPlaying ? <img className="song-play" src="https://image.freepik.com/free-icon/video-pause-button_318-33989.jpg" 
                        onClick={() => {this.audio.pause()
                                        this.setState({songPlaying: false})}}/> : 
                        <img className="song-play" src="https://image.flaticon.com/icons/svg/0/375.svg" 
                        onClick={() => {
                            this.audio.src = song.previewUrl
                            this.audio.load()
                            this.audio.play()
                            this.setState({songPlaying: true})
                        }} />}
                        <img className="song-play" src="http://icons.iconarchive.com/icons/iconsmind/outline/128/Like-2-icon.png" />
                    </div>
                ))}
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
    user: state.user,
    currentChat: state.currentChat,
    songs: state.songs
  }
}

const mapDispatch = (dispatch) => {
  return {
    postSong(title, artist, user, chatId) {
        dispatch(postSong(title, artist, user, chatId))
    },
    fetchSongs(chatId) {
        dispatch(fetchSongs(chatId))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Jukebox))
