import io from 'socket.io-client'
import store, {newSong, newLike}  from './store'

const socket = io(window.location.origin)

socket.on('new-song', song => {
  store.dispatch(newSong(song))
})

socket.on('new-like', song => {
  store.dispatch(newLike(song))
})

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
