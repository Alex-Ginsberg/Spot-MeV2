import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { fetchChat } from '../store/currentChat';
import Jukebox from './Jukebox'
import AddToChat from './AddToChat'
import { slide as Menu } from 'react-burger-menu'
import Messaging from './Messaging'
import axios from 'axios'
import {fetchFriends} from '../store'

class SingleChat extends React.Component{
  constructor() {
    super()
    this.state = {
      owner: {}
    }
  }

  componentDidMount() {
    this.props.fetchChat(this.props.match.params.id)
    this.props.fetchFriends()
  }

  render() {
      // Gets the info about the admin of the chat AFTER that currentChat has been set
      if (!this.state.owner.id && this.props.currentChat.userId){
        axios.get(`/api/users/${this.props.currentChat.userId}`)
          .then(res => res.data)
          .then(user => this.setState({owner: user}))
      }

      const {currentChat} = this.props
      const {owner} = this.state
      return (
        <div>
            <Menu styles={styles} right customBurgerIcon={<img src="https://image.flaticon.com/icons/svg/26/26805.svg" />}>
              <Jukebox />
            </Menu>
            <Menu styles={stylesFriends} right customBurgerIcon={<img src="https://d30y9cdsu7xlg0.cloudfront.net/png/138580-200.png" />}>
              <AddToChat />
            </Menu>
            <h1>{currentChat.name}</h1>
            <a href={currentChat.externalUrl}>Open in Spotify</a>
            <h3>Created by {owner.name}</h3>
            <img src={owner.proPic} />
            {currentChat.id && <Messaging chatId={currentChat.id} />}
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
    friends: state.friends
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchChat(id) {
      dispatch(fetchChat(id))
    },
    fetchFriends() {
      dispatch(fetchFriends())
    }
  }
}

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: '#b8b7ad',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    // background: '#bdc3c7'
  },
  bmMenu: {
    background: 'white',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
    // opacity: 0.7,/
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

const stylesFriends = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '36px',
    top: '80px'
  },
  bmBurgerBars: {
    background: '#b8b7ad',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    // background: '#bdc3c7'
  },
  bmMenu: {
    background: 'white',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
    // opacity: 0.7,/
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(SingleChat))
