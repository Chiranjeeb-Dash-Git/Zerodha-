import React, { useEffect } from 'react';
import './Education.css';

function Education() {
  useEffect(() => {
    const trustItems = document.querySelectorAll('.trust-item');
    
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.2,
      rootMargin: '0px'
    });

    trustItems.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">Trust with confidence</h2>
      <div className="row align-items-center">
        <div className="col-md-7">
          <div className="trust-points">
            <div className="trust-item mb-4">
              <h4>Customer-first always</h4>
              <p>That's why 1.5+ crore customers trust Zerodha with ₹4.5+ lakh crores of equity investments and contribute to 15% of daily retail exchange volumes in India.</p>
            </div>
            <div className="trust-item mb-4">
              <h4>No spam or gimmicks</h4>
              <p>No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like.</p>
            </div>
            <div className="trust-item mb-4">
              <h4>The Zerodha universe</h4>
              <p>Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>
            </div>
            <div className="trust-item mb-4">
              <h4>Do better with money</h4>
              <p>With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.</p>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <img 
            src={process.env.PUBLIC_URL + "/media/images/ecosystem.png"} 
            alt="Zerodha Ecosystem" 
            className="ecosystem-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Education;
