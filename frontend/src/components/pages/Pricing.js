import React from 'react';

function Pricing() {
  return (
    <div className="pricing-container">
      <div className="container py-5">
        <h1>Pricing</h1>
        <div className="row mt-4">
          <div className="col-md-4 mb-4">
            <div className="card pricing-card">
              <div className="card-body">
                <h5 className="card-title">Free Equity Delivery</h5>
                <h6 className="card-subtitle mb-2 text-muted">₹0</h6>
                <p className="card-text">Zero brokerage on equity delivery trades</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card pricing-card">
              <div className="card-body">
                <h5 className="card-title">Intraday & F&O</h5>
                <h6 className="card-subtitle mb-2 text-muted">₹20</h6>
                <p className="card-text">Flat rate per executed order</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card pricing-card">
              <div className="card-body">
                <h5 className="card-title">Account Opening</h5>
                <h6 className="card-subtitle mb-2 text-muted">₹200</h6>
                <p className="card-text">One-time account opening fee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;