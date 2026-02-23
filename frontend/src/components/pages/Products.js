import React from 'react';

function Products() {
  return (
    <div className="products-container">
      <div className="container py-5">
        <h1>Our Products</h1>
        <div className="row mt-4">
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Kite</h5>
                <p className="card-text">
                  Our flagship trading platform with streaming market data, advanced charts, and more.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Console</h5>
                <p className="card-text">
                  The central dashboard for your Zerodha account with detailed reports and analytics.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Coin</h5>
                <p className="card-text">
                  Zero commission mutual fund investment platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;