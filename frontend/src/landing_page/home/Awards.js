import React, { useEffect } from 'react';
import './Awards.css';

function Awards() {
  useEffect(() => {
    const awards = document.querySelectorAll('.award-text p');
    let currentIndex = 0;

    const animateAwards = () => {
      awards.forEach((award, index) => {
        award.classList.remove('active');
      });
      awards[currentIndex].classList.add('active');
      currentIndex = (currentIndex + 1) % awards.length;
    };

    animateAwards();
    const interval = setInterval(animateAwards, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">Awards & Recognition</h2>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-4 text-center">
          <img 
            src="https://zerodha.com/static/images/largest-broker.svg" 
            alt="Best Retail Broker Award" 
            className="img-fluid mb-3 award-image"
          />
        </div>
        <div className="col-md-4 text-center">
          <img 
            src={process.env.PUBLIC_URL + "/media/images/largestBroker.svg"} 
            alt="Digital Innovation Award" 
            className="img-fluid mb-3 award-image"
          />
        </div>
        <div className="col-md-4 text-center">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/2583/2583344.png" 
            alt="Excellence in Trading Award" 
            className="img-fluid mb-3 award-image"
          />
        </div>
      </div>
      <div className="text-center award-text mt-2">
        <p className="award-item">Startup of the Year – Economic Times (2016)</p>
        <p className="award-item">Retail Broker of the Year – NSE & MCX multiple times</p>
        <p className="award-item">Best Indian Stock Broker – NSE (2018, 2019)</p>
        <p className="award-item">CNBC-Awaaz Best Performing Stock Broker (multiple years)</p>
        <p className="award-item">National Stock Exchange (NSE) Retail Broker of the Decade – 2020</p>
      </div>
    </div>
  );
}

export default Awards;