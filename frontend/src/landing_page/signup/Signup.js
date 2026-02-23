import React, { useState } from 'react';
import './Signup.css';
import NavBar from '../home/NavBar';
import Footer from '../home/Footer';

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    terms: false
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password
        })
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="signup-container">
      <NavBar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body p-5">
                <h2 className="text-center mb-4">Open a Zerodha account</h2>
                <p className="text-center text-muted mb-4">Sign up now for free and start investing</p>
                
                {error && <div className="alert alert-danger">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="fullName" 
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name" 
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email" 
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">Mobile Number</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      id="mobile" 
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter your 10-digit mobile number" 
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="password" 
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password" 
                      required
                    />
                  </div>
                  
                  <div className="mb-4 form-check">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      id="terms"
                      checked={formData.terms}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="terms">I agree to the Terms and Conditions</label>
                  </div>
                  
                  <button type="submit" className="btn btn-primary w-100 py-2">Continue</button>
                </form>
                
                <div className="mt-4 text-center">
                  <p>Already have an account? <a href="/login" className="text-decoration-none">Log in</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;