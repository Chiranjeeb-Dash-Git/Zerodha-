import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-0">
          <div className="col-md-3">
            <img src="https://zerodha.com/static/images/logo.svg" alt="Zerodha" className="footer-logo" />
            <p className="mt-2">
              <span className="phone">+91 80 4040 2020</span><br />
              <a href="mailto:support@zerodha.com">support@zerodha.com</a>
            </p>
            <div className="social-links mt-2">
              <a href="https://twitter.com/zerodhaonline" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://facebook.com/zerodha.social" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://instagram.com/zerodha.tech" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://linkedin.com/company/zerodha" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
          <div className="col-md-2">
            <h5>Company</h5>
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/pricing">Pricing</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/media">Media & Press</a></li>
              <li><a href="/zerodha.tech">Zerodha.tech</a></li>
            </ul>
          </div>
          <div className="col-md-2">
            <h5>Support</h5>
            <ul>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/support">Support Portal</a></li>
              <li><a href="/z-connect">Z-Connect Blog</a></li>
              <li><a href="/margin-calculator">Margin Calculator</a></li>
              <li><a href="/resources">Resources</a></li>
            </ul>
          </div>
          <div className="col-md-2">
            <h5>Account</h5>
            <ul>
              <li><a href="/open-account">Open an Account</a></li>
              <li><a href="/fund-transfer">Fund Transfer</a></li>
              <li><a href="https://console.zerodha.com">60 day challenge</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <div className="footer-info">
              <img src="https://zerodha.com/static/images/footer-map.svg" alt="Zerodha Offices" className="map-image" />
              <a href="/contact" className="office-link">Find our offices</a>
            </div>
          </div>
        </div>
        <div className="regulatory-section">
          <div className="footer-bottom">
            <p>© 2010 - 2023, Zerodha Broking Ltd. All rights reserved.</p>
            <p>NSE & BSE – SEBI Registration no.: INZ000031633 | CDSL: Depository services through Zerodha Securities Pvt. Ltd. – SEBI Registration no.: IN-DP-431-2019</p>
          </div>
          <div className="regulatory-info">
            <p className="reg-text">Zerodha Broking Ltd.: Member of NSE, BSE​ &​ MCX – SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Commodity Trading through Zerodha Commodities Pvt. Ltd. MCX: 46025; NSE-50001 – SEBI Registration no.: INZ000038238</p>
            <p className="reg-text">Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any complaints pertaining to securities broking please write to complaints@zerodha.com, for DP related to dp@zerodha.com. Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI | ICF</p>
            <div className="sebi-scores">
              <p className="reg-text">Procedure to file a complaint on SEBI SCORES: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances</p>
              <p className="reg-text">
                <a href="https://zerodha.com/dispute-resolution" target="_blank" rel="noopener noreferrer">Smart Online Dispute Resolution</a> | 
                <a href="https://zerodha.com/grievances" target="_blank" rel="noopener noreferrer">Grievances Redressal Mechanism</a>
              </p>
            </div>
            <p className="reg-text warning">Investments in securities market are subject to market risks; read all the related documents carefully before investing.</p>
            <div className="attention-investors">
              <p className="reg-text">Attention investors:</p>
              <ol>
                <li>Stock brokers can accept securities as margins from clients only by way of pledge in the depository system w.e.f September 01, 2020.</li>
                <li>Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge.</li>
                <li>Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.</li>
              </ol>
            </div>
            <p className="reg-text">Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary.</p>
            <p className="reg-text">Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non allotment the funds will remain in your bank account.</p>
            <p className="reg-text">As a business we don't give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of Zerodha and offering such services, please create a ticket here.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer