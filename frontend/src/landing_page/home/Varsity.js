import React from 'react';
import './Varsity.css';

function Varsity() {
  return (
    <div className="container py-3">
      <h2 className="text-center mb-2">Free and open market education</h2>
      <p className="text-center subtitle mb-2">Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
      
      <div className="row align-items-center g-3">
        <div className="col-md-6">
          <div className="varsity-content">
            <h3>Varsity</h3>
            <p>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
            <button className="btn btn-primary">TradingQ&A</button>
          </div>
        </div>
        <div className="col-md-6">
          <img 
            src={process.env.PUBLIC_URL + "/media/images/varsity.png"}
            alt="Varsity Education" 
            className="varsity-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/400x300?text=Varsity";
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Varsity;