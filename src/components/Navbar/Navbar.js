import React, { Component } from 'react';
import { MenuItems } from "./MenuItems"
import { Button } from "../Button"
import './Navbar.css'
import { Link } from 'react-router-dom';

/**
 * Navbar component
 * Handles navigation on application for users not logged in
 * @author Simon Nilsson, simnil-8
 * @author Christoffer Lindberg,
*/

class Navbar extends Component {
// Store if items are clicked or not
state = { clicked: false}

handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
}
closeMenu = () => {
    this.setState({ clicked: !this.state.clicked })
}

    render() {
        return(
            <nav className="NavbarItems">
                <Link to='/home' className="link-style">
                <h1 className="navbar-logo">BOTHNIABLADET</h1>
                </Link>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) => {
                        return(
                            <Link to={item.path} className={item.cName} onClick={this.handleClick}> 
                            <li key={index}>
                                {item.title}  
                            </li>
                             </Link>
                        )
                     })}
                 </ul>
                 <Link to='/signin'>
                 <Button>Logga in</Button>
                 </Link>
            </nav>
        )
    }
}

export default Navbar
