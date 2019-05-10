import React from 'react';
import {NavLink} from "react-router-dom";

const Header = ({user, logout}) => {
    return (
        <nav className="navbar navbar-dark bg-success">
            <NavLink to="/" className="navbar-brand">Chat</NavLink>

            {user
                ? <div>
                    <span onClick={logout} className="btn btn-sm btn-outline-light">Log out</span>
                </div>
                : <div>
                    <NavLink to="/register" className="navbar-brand">Register</NavLink>
                    <NavLink to="/login" className="navbar-brand">Login</NavLink>
                </div>
            }

        </nav>
    );
};

export default Header;
