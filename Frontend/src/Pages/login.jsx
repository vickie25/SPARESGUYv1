import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../slices/usersApiSlice';
import LoginFrame from '../Homepage/HomepageImages/gears.jpg';
import './PagesCSS/Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const credentials = { email, password };
      const res = await loginUser(credentials).unwrap();
      console.log('Login successful:', res);
      navigate('/shop');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={LoginFrame} alt="Frame" className="img-fluid" />
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
