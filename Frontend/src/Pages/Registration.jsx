import React, { useState } from 'react';
import './PagesCSS/Registration.css'
import LoginFrame from '../Homepage/HomepageImages/LoginFrame.svg'

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="registration-container">
      <div className="registration-image">
      <img 
            src={LoginFrame} 
            alt="Frame" 
            className="img-fluid" 
          />
      </div>
      <div className="registration-form">
        <h1>Create an account</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input 
            type="text"
            name="emailOrPhone"
            placeholder="Email or Phone Number"
            value={formData.emailOrPhone}
            onChange={handleChange}
          />
          <input 
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input 
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button type="submit">Create Account</button>
        </form>
        <button className="google-signup">Sign up with Google</button>
        <div className="login-link">
          <p>Already have an account? <a href="/login">Log in</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
