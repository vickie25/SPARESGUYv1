import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './HomepageCSS/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/path-to-your-logo.png" alt="Logo" />
      </div>
      <nav className="nav-links">
        <a href="/">Home</a>
        <a href="/shop">Shop</a>
        <a href="/about">About</a>
        <a href="/contact">Contact Us</a>
      </nav>
      <div className="search-bar">
        <input type="text" placeholder="Search products..." />
        <button type="submit">Search</button>
      </div>
      <div className="icons">
        <i className="user-icon">User</i>
        <i className="cart-icon">Cart</i>
      </div>
    </header>
  );
};

export default Header;