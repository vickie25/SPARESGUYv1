import React, { useState } from 'react';
import './PagesCSS/Login.css';
import LoginFrame from '../Homepage/HomepageImages/LoginFrame.svg';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../slices/usersApiSlice';

const LoginPage = () => {
  // Separate state variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // For navigation after successful login
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'email') {
      setEmail(value); // Update email state
    } else if (name === 'password') {
      setPassword(value); // Update password state
    }
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior

    try {
      console.log(password); // Log password for debugging
      
      // Create credentials object from email and password state
      const credentials = { email, password };
      
      // Send login request to backend
      const res = await loginUser(credentials).unwrap();
      console.log('Login successful:', res);

      // Redirect to homepage/dashboard after successful login
      navigate('/shop');  // Replace with your desired route
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

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
        <form onSubmit={handleLogin}>
          <input 
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            required
          />
          <input 
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {isError && <p className="error-message">{error?.data?.message || 'Login failed'}</p>}
        <button className="forgot-password">Forgot Password?</button>
        <div className="signup-link">
          <p>Don't have an account? <a href="/registration"><b>Sign up</b></a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
