import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {postSong, fetchSongs, putLike} from '../store'
import axios from 'axios'


class Jukebox extends React.Component{

    constructor() {
        super()
        this.state = {
            songText: '',
            artistText: '',
            songPlaying: 0,
            recentlyLiked: []
        }
        this.handleSongSubmit = this.handleSongSubmit.bind(this)
        this.audio = document.createElement('audio')
    }

    componentDidMount() {
        this.props.fetchSongs(this.props.match.params.id)
    }

    handleSongSubmit(e) {
        e.preventDefault()
        this.setState({songText: '', artistText: ''})
        this.props.postSong(this.state.songText, this.state.artistText, this.props.user, this.props.currentChat[0].id)      
    }

    render() {
        const songsToRender = this.props.songs.map(song => {
            let beenLiked = false
            if (song.users) {
                for (let i = 0; i < song.users.length; i++) {
                    if (song.users[i].id === this.props.user.id) {
                        beenLiked = true
                    }
                }
            }
            song.beenLiked = beenLiked
            return song
        })
        console.log(this.props.currentChat)
        return (
            
            <div>
                <h1>Jukebox</h1>
                {songsToRender.map(song => (
                    <div className="song" key={song.id}>
                        <p>{song.name} - <small>{song.artist}</small></p>
                        <img className="song-pic" src={song.image} />
                        {this.state.songPlaying === song.id ? <img className="song-play" src="https://image.freepik.com/free-icon/video-pause-button_318-33989.jpg" 
                        onClick={() => {this.audio.pause()
                                        this.setState({songPlaying: 0})}}/> : 
                        <img className="song-play" src="https://image.flaticon.com/icons/svg/0/375.svg" 
                        onClick={() => {
                            this.audio.src = song.previewUrl
                            this.audio.load()
                            this.audio.play()
                            this.setState({songPlaying: song.id})
                        }} />}
                        {(song.beenLiked || this.state.recentlyLiked.includes(song.id)) ? <img className="been-liked" src="https://image.flaticon.com/icons/svg/81/81250.svg" /> : <img className="song-play" src="http://icons.iconarchive.com/icons/iconsmind/outline/128/Like-2-icon.png" 
                        onClick={() => {
                            if (song.likes + 1 >= this.props.currentChat[0].likesNeeded) {
                                axios({
                                    method: 'post',
                                    url: `https://api.spotify.com/v1/users/${this.props.currentChat[0].admin}/playlists/${this.props.currentChat[0].playlistId}/tracks?uris=${song.uri}`,
                                    headers: {
                                        'Authorization': 'Bearer ' + this.props.currentChat[1].accessToken,
                                        'Content-Type': 'application/json'
                                    }
                                })
                            }
                            this.props.putLike(song.id)   
                            const oldLikes = this.state.recentlyLiked
                            oldLikes.push(song.id)
                            this.setState({recentlyLiked: oldLikes})
                        }}
                        />}
                        <p className="num-likes">{song.likes}</p>
                    </div>
                ))}
                <form onSubmit={this.handleSongSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Submit a Song</label>
                        <input className="form-control" type="text" name="songName" placeholder="Enter song name" required 
                        onChange={(e) => this.setState({songText: e.target.value})} value={this.state.songText} />
                        <input className="form-control" type="text" name="songArtist" placeholder="Enter artist" required  
                        onChange={(e) => this.setState({artistText: e.target.value})} value={this.state.artistText} />
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
    },
    putLike(songId) {
        dispatch(putLike(songId))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Jukebox))
