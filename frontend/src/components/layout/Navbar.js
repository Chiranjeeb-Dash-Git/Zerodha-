import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src="/logo.png" alt="Zerodha" />
                </Link>

                {token ? (
                    <ul className="nav-menu">
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/trading" className="nav-link">Trade</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/market" className="nav-link">Markets</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/portfolio" className="nav-link">Portfolio</Link>
                        </li>
                        <li className="nav-item">
                            <button onClick={handleLogout} className="nav-link logout-btn">
                                Logout
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul className="nav-menu">
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">Register</Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
}

export default Navbar;