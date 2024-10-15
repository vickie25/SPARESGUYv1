import React from 'react'
import Header from '../Homepage/Header'
import Footer from '../Homepage/Footer'
import "./PagesCSS/userProfile.css";
import { FiUser } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import carouselImage from '../Homepage/HomepageImages/defaultuser.png';

const UserProfile = () => {
  return (
    <div>
      <header><Header /></header>
      <main>
        <div className="sidebar">
          <div class="display-image-container">
            <img src={carouselImage} alt="User Carousel" className="display-image" />
          </div>
          <ul>
            <li><FiUser className='icon' />Personal Information</li>
            <li><MdFavoriteBorder className='icon' />My Wishlist</li>
            <li><IoMdNotificationsOutline className='icon' />Notifications</li>
            <li><IoSettingsOutline className='icon' />Settings</li>
          </ul>
        </div>
        <div className="userdetails">
          <div className="top">
            <div class="display-image-container-top">
              <img src={carouselImage} alt="User Carousel" className="display-image-top" />
            </div>
            <button className='edit-button'>Edit Profile</button></div>

          <div className="details">
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label htmlFor="emailAddress">Email Address:</label>
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your address"
              />
            </div>
          </div>


        </div>
      </main>
      <footer><Footer /></footer>
    </div>
  )
}

export default UserProfile
