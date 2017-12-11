import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'


class Navbar extends React.Component{
    render() {
        return (
            <div>
                <ul className="navbar">
                    <li className="nav-box"><a className="nav-item">Home</a></li>
                    <li className="nav-box"><a className="nav-item">Add Friends</a></li>
                    <li className="nav-box"><a className="nav-item">My Friends</a></li>
                    <li className="nav-box"><a className="nav-item">My Groups</a></li>
                </ul>
            </div>
      )
    }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default Navbar
