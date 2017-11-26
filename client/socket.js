import io from 'socket.io-client'
import store, {newSong}  from './store'

const socket = io(window.location.origin)

socket.on('new-song', song => {
  store.dispatch(newSong(song))
})

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
