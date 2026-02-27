import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={process.env.PUBLIC_URL + "/media/images/logo.svg"} alt="Zerodha" height="30" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/120x30?text=Zerodha";
            }}
          />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pricing">Pricing</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/support">Support</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-primary" to="/register">Sign up</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;