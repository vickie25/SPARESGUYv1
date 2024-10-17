import React, { useState } from 'react';
import './PagesCSS/Registration.css';
import LoginFrame from '../Homepage/HomepageImages/LoginFrame.svg';
import { useRegisterUserMutation } from '../slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();  // For navigation after successful registration
  const [registerUser, { isLoading, isError, error }] = useRegisterUserMutation();

  if(isLoading){
    return <p>Loading...</p>
  }

  const handleRegister = async (e) => {
    e.preventDefault();  // Prevent default form submission

    // Password mismatch check
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      console.log(name, email, password);
      const res = await registerUser({ name, email, password }).unwrap(); // Make API call
      console.log("This is the response", res);

      // On successful registration, redirect the user (e.g., to login)
      navigate('/login');  // Navigate to the login page
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-image">
        <img src={LoginFrame} alt="Frame" className="img-fluid" />
      </div>
      <div className="registration-form">
        <h1>Create an account</h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Create Account'}
          </button>
        </form>
        {isError && <p className="error-message">{error?.data?.message || "Registration failed"}</p>}
        <button className="google-signup">Sign up with Google</button>
        <div className="login-link">
          <p>Already have an account? <a href="/login">Log in</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
