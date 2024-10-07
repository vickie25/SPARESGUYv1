import React, { useState } from 'react';
import './PagesCSS/Registration.css'
import LoginFrame from '../Homepage/HomepageImages/LoginFrame.svg'
import {useRegisterUserMutation} from '../slices/usersApiSlice'

const RegistrationPage = () => {
 const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [registerUser, {isLoading, isError}] = useRegisterUserMutation();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    }
    const res = await registerUser({name, email, password});
    console.log(res);

  }

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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input 
            type="text"
            name="emailOrPhone"
            placeholder="Email or Phone Number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setName(e.target.value)}
          />
          <input 
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleRegister} type="submit">Create Account</button>
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
