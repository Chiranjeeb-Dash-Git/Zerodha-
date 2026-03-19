import React from 'react';
import { Link } from 'react-router-dom';

function Support() {
  return (
    <div className="support-container">
      <div className="container py-5">
        <h1>Support</h1>
        <div className="row mt-4">
          <div className="col-md-6">
            <h3>Trading & Technical Support</h3>
            <p>Monday to Friday: 8:00 AM to 8:00 PM</p>
            <p>Email: Chiranjeeb.email@gmail.com</p>
            <p>Phone: +917854943328</p>
          </div>
          <div className="col-md-6">
            <h3>Quick Links</h3>
            <ul className="list-unstyled">
              <li><Link to="/support/portal" className="text-decoration-none">Support Portal</Link></li>
              <li><Link to="/support/knowledge" className="text-decoration-none">Knowledge Base</Link></li>
              <li><Link to="/market-updates" className="text-decoration-none">Market Updates</Link></li>
              <li><Link to="/contact" className="text-decoration-none">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;