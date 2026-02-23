import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <div className="container-fluid bg-white py-5">
      <div className="row flex-column align-items-center text-center">
        <div className="col-md-8 mb-5">
          <img
            src={process.env.PUBLIC_URL + "/media/images/homeHero.png"}
            alt="Zerodha trading platform interface" 
            className="img-fluid"
            style={{
              maxWidth: '100%',
              maxHeight: '600px',
              objectFit: 'contain'
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/600x400?text=Zerodha+Platform";
            }}
          />
        </div>
        <div className="col-md-6">
          <div className="hero-content">
            <h1 className="display-4 fw-bold mb-4">Invest in everything</h1>
            <p className="lead text-muted mb-4">
              Online platform to invest in stocks, derivatives, mutual funds, and more
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/register" className="btn btn-primary btn-lg px-4">Sign up now</Link>
              <Link to="/trading" className="btn btn-success btn-lg px-4">
                Start Trading
                <span className="arrow-blink">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;