import React from 'react'
import './Stats.css'

function Stats() {
  return (
    <div className="container py-5">
      <div className="row text-center">
        <div className="col-md-3 mb-4">
          <h2>12+ Million</h2>
          <p>Zerodha Clients</p>
        </div>
        <div className="col-md-3 mb-4">
          <h2>15%</h2>
          <p>of all Retail Trading Volume</p>
        </div>
        <div className="col-md-3 mb-4">
          <h2>₹0</h2>
          <p>Account Charges</p>
        </div>
        <div className="col-md-3 mb-4">
          <h2>4.5/5</h2>
          <p>Customer Satisfaction</p>
        </div>
      </div>
    </div>
  )
}
export default Stats