import React from 'react';
import {NavLink} from "react-router-dom";

const Header = ({user, logout}) => {
    return (
        <nav className="navbar navbar-dark bg-success">
            <NavLink to="/" className="navbar-brand">Chat</NavLink>
            {user
                ? <ul className="navbar-nav">
                    <li className="nav-item">
                        <span className="nav-link">Hi, {user.fullName}</span>
                    </li>
                    <li className="nav-item" onClick={logout}>
                        <span className="nav-link">Log out</span>
                    </li>
                </ul>
                : <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/register" className="nav-link">Register</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/login" className="nav-link">Login</NavLink>
                    </li>
                </ul>
            }
        </nav>
    );
};

export default Header;
