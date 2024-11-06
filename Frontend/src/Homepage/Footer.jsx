import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './HomepageCSS/Footer.css';
import { BsTelephone } from "react-icons/bs";
import { FiMail, FiMapPin } from "react-icons/fi";
import { BiAccessibility } from "react-icons/bi";
// import logo from '../assets/logobg.png';
import "./HomepageCSS/Footer.css"

const Footer = () => {

  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer" style={{ marginTop: '50px' }}>
      <div className="footer-top" >
        <div className="footer-section logo">
          {/* <img src={logo} alt="Logo" className="footer-logo" /> */}
          <h3>MY SPARES GUY</h3>
          <a href="https://www.google.com/maps/place/Ngara,+Nairobi" target="_blank" rel="noopener noreferrer"><FiMapPin /> 11122-Ngara,
            Nairobi</a>
        </div>
        <div className="footer-section cities">
          <h3>Top Cities</h3>
          <ul>
            <li>Kenya</li>
            <li>Uganda</li>
            <li>Rwanda</li>
            <li>Tanzania</li>
          </ul>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Products</a></li>
            <li><a href="/AboutUs">About</a></li>
            <li><a href="/ContactUs">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section newsletter">
          <h3>Subscribe to Newsletter</h3>
          <ul>
            <p>Get $10 off your first order.</p>
            <p>Stay updated with our latest news.</p>
          </ul>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <ul>
            <li><a href="tel:+2547123456"><BsTelephone className='icon' />+2547123456</a></li>
            <li><a href="mailto:apbcafricait@gmail.com"><FiMail className='icon' />apbcafricait@gmail.com</a></li>
          </ul>
        </div>
      </div>
      <hr />

      <div className="footer-bottom">
        <p>&copy; {currentYear} My Website. All rights reserved.</p>
        <p>Privacy policy</p>
        <p>Terms & Conditions</p>
        <p> <BiAccessibility className='icon' />ACCESSIBILITY</p>
      </div>
    </footer>

  );
};

export default Footer;
