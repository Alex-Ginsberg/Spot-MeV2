import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios'


class Messaging extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        axios.get(`/api/message/${this.props.chatId}`)
            .then(res => res.data)
            .then(messages => this.setState({messages}))
    }

    render() {
        console.log(this.state)
        return (
            <div>

            </div>
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

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Messaging))
