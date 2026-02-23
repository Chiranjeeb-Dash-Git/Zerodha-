import React from 'react'
import { Link } from 'react-router-dom'
import './OpenAccount.css'

function OpenAccount() {
  return (
    <div className="container py-3 text-center">
      <h2 className="mb-2">Open a Zerodha account</h2>
      <p className="mb-2">Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
      <div className="d-flex justify-content-center">
        <Link to="/register" className="btn btn-primary">Sign up now</Link>
      </div>
    </div>
  )
}

export default OpenAccount