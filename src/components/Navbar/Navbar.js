import React, { Component } from 'react';
import { MenuItems } from "./MenuItems"
import { Button } from "../Button"
import './Navbar.css'
import { Link } from 'react-router-dom';

class Navbar extends Component {
state = { clicked: false}

handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
}

    render() {
        return(
            <nav className="NavbarItems">
                <h1 className="Navbar-logo">Bothniabladet<i className="fab fa-react"></
                i></h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    
                    <Link to="/home">
                        <li>Home</li>
                    </Link>  
                    <Link to="/upload">
                        <li>Upload</li>
                    </Link>                           
                 </ul>
                 <Link to="/signin">
                 <Button>Sign in</Button>
                 </Link> 
            </nav>
        )
    }
}

export default Navbar


