import React from 'react';
import './AboutUsCSS/WhyUs.css'; // Ensure you import your CSS file

const WhyUs = () => {
  return (
    <div className="why-us-container">
      <div className="title">
        <h1>Why Shop With Us</h1>
      </div>
      <br />
      <div className="why-us-items-container">
        <div className="why-us-item">
          <h3>Quality You Can Trust</h3>
          <p>We provide only the highest quality car parts from reputable brands, ensuring your vehicle gets the best.</p>
        </div>
        <div className="divider" />
        <div className="why-us-item">
          <h3>Competitive Pricing</h3>
          <p>Get premium car parts at prices that won’t break the bank. We believe in offering value for every budget.</p>
        </div>
        <div className="divider" />
        <div className="why-us-item">
          <h3>Fast and Reliable Shipping</h3>
          <p>We know you need your parts fast. That’s why we offer quick and reliable shipping to get your car back on the road as soon as possible.</p>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;