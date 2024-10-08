import React, { useState } from 'react';
import './PagesCSS/Login.css';
import LoginFrame from '../Homepage/HomepageImages/LoginFrame.svg'

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    emailOrPhone: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Perform login logic here
  // };

  return (
    <div className="login-container">
      <div className="login-image">
      <img 
            src={LoginFrame} 
            alt="Frame" 
            className="img-fluid" 
          />
      </div>
      <div className="login-form">
        <h1>Welcome Back!</h1>
        <p>Please enter your details below</p>
        {/* <form onSubmit={handleSubmit}> */}
          <input 
            type="text"
            name="emailOrPhone"
            placeholder="Email or Phone Number"
            value={credentials.emailOrPhone}
            onChange={handleChange}
          />
          <input 
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
          />
          <br></br>       
            <button type="submit" >Login</button>
        {/* </form> */}
        <button className="forgot-password">Forgot Password?</button>
        <div className="signup-link">
          <p>Don't have an account? <a href="/registration"><b>Sign up</b></a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
