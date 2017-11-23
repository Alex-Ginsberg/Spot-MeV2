import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {me} from '../store'
import axios from 'axios'
import socket from '../socket'


class Messaging extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            currentBody: ''
        }
        this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount() {
        this.props.isLoggedIn()
        socket.on('new-message', message => {
            const oldMessages = this.state.messages
            oldMessages.push(message)
            this.setState({messages: oldMessages})
        })
        axios.get(`/api/message/${this.props.chatId}`)
            .then(res => res.data)
            .then(messages => this.setState({messages}))
    }

    sendMessage() {
        const messageObj = {
            body: this.state.currentBody,
            userId: this.props.user.id,
            chatId: this.props.chatId
        }
        axios.post('/api/message', messageObj)
            .then(res => res.data)
            .then(message => {
                const oldMessages = this.state.messages
                message.user = this.props.user
                oldMessages.push(message)
                socket.emit('new-message', message)
                this.setState({messages: oldMessages, currentBody: ''})
            })
    }

    render() {     
        const {messages} = this.state 
        return (
            <div>
                {messages.map(message => (
                    <div className="chatBubble" key={message.id}>
                        <img className="chatPic" src={message.user.proPic} />
                        <p>{message.user.name}: {message.body}</p>
                    </div>
                ))}
                <form onSubmit={(e) => {
                    e.preventDefault()
                    this.sendMessage()
                    }}>
                    <div className="form-group">
                        <input className="form-control" type="text" name="categoryName" placeholder="Send a message..." 
                        onChange={(e) => this.setState({currentBody: e.target.value})} value={this.state.currentBody} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-default">Send</button>
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
    isLoggedIn() {
        dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Messaging))
