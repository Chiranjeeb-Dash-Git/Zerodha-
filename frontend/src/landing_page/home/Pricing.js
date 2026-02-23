import React from 'react';
import './Pricing.css';

function Pricing() {
  return (
    <div className="pricing-section text-center py-3">
      <div className="container">
        <div className="pricing-cards">
          <div className="row justify-content-center g-3">
            <div className="col-md-4">
              <div className="price-card">
                <h3>₹0</h3>
                <p>Free account<br/>opening</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="price-card">
                <h3>₹0</h3>
                <p>Free equity delivery<br/>and direct mutual funds</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="price-card">
                <h3>₹20</h3>
                <p>Intraday and<br/>F&O</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;