import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './HomepageCSS/Header.css';
import logo from './HomepageImages/logo.svg';
import { FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { FcLike } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import { AiTwotoneShopping } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { FiStar } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";

const Header = () => {
  return (
    <header className="header">
      <div className="header-inner container">

        <div className="logo">
          <img src={logo} alt="Logo"  style={{height: '40px'}}/>
        </div>

        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/about">About</a>
          <a href="/contact">Contact Us</a>
        </nav>

        <div className="search-bar">
          <input type="text" placeholder="What are you looking for?" />
          <button type="submit" className="search-btn">
            <FaSearch />
          </button>
        </div>

        <div className="icon cart-icon">
            <FcLike />
          </div>

        <div className="icons">
          <div className="icon user-icon">
            <FaUser />
            <div className="dropdown">
              <ul>
                <li><a href="/account"><CgProfile/>Manage My Account</a></li>
                <li><a href="/orders"><AiTwotoneShopping/>My Order</a></li>
                <li><a href="/cancellations"><ImCancelCircle/>My Cancellations</a></li>
                <li><a href="/reviews"><FiStar/>My Reviews</a></li>
                <li><a href="/logout"><CiLogout/>Logout</a></li>
              </ul>
            </div>
          </div>
          <div className="icon cart-icon">
            <FaShoppingCart />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
