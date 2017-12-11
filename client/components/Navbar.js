import React from 'react'
import {Link} from 'react-router-dom'


class Navbar extends React.Component{
    render() {
        return (
            <div>
                <ul className="navbar">
                    <Link to={'/profile'}><li className="nav-box"><a className="nav-item">Home</a></li></Link>
                    <Link to ={'/addfriends'}><li className="nav-box"><a className="nav-item">Add Friends</a></li></Link>
                    <Link to={'/myfriends'}><li className="nav-box"><a className="nav-item">My Friends</a></li></Link>
                    <Link to={'/mygroups'}><li className="nav-box"><a className="nav-item">My Groups</a></li></Link>
                </ul>
            </div>
      )
    }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default Navbar
