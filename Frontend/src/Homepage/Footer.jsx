import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './HomepageCSS/Footer.css';
  
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h5>Top Cities</h5>
        <ul>
          <li>Nairobi</li>
          <li>Rwanda</li>
          <li>Uganda</li>
          <li>Tanzania</li>
        </ul>
      </div>

      <div className="footer-section">
        <h5>Quick Links</h5>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>FAQ</li>
          <li>Contact Us</li>
        </ul>
      </div>

      <div className="footer-section">
        <h5>Subscribe to newsletter</h5>
        <p>Stay updated with our latest.</p>
        <form action="/subscribe" method="POST">
          <input type="email" placeholder="Email..." name="email" />
          <button type="submit">→</button>
        </form>
      </div>

      <div className="footer-section">
        <h5>Contact Us</h5>
        <p>Phone: +254-707-245890</p>
        <p>Email:@gmail.com</p>
      </div>

      <div className="footer-bottom">
        <p>11201 Ngara</p>
        <p>©2021 My Spares Guy. All rights reserved</p>
        <p>
          <a href="/privacy-policy">Privacy Policy</a> | 
          <a href="/terms-conditions">Terms & Conditions</a> | 
          <a href="/accessibility">ACCESSIBILITY</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;