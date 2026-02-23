import React from 'react';

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
              <li><a href="/support/portal" className="text-decoration-none">Support Portal</a></li>
              <li><a href="/support/knowledge" className="text-decoration-none">Knowledge Base</a></li>
              <li><a href="/market-updates" className="text-decoration-none">Market Updates</a></li>
              <li><a href="/contact" className="text-decoration-none">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;