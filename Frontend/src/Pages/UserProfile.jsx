import React, { useState, useEffect } from 'react';
import Header from '../Homepage/Header';
import Footer from '../Homepage/Footer';
import "./PagesCSS/userProfile.css";
import { useLocation } from 'react-router-dom';
import { FiUser } from "react-icons/fi";
import { CiSquareMinus } from "react-icons/ci";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { BsCaretDownFill } from 'react-icons/bs';
import { BsToggleOff } from "react-icons/bs";
import { BsToggleOn } from "react-icons/bs";
import carouselImage from '../Homepage/HomepageImages/defaultuser.png';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
// In your login function or component
import { useUser } from './UserContext';


 

const UserProfile = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});
  const location = useLocation();
  const [is2FAEnabled, setIs2FAEnabled] = useState(() => {
    return JSON.parse(localStorage.getItem('is2FAEnabled')) || false;
  });
  const [isEmailNotEnabled, setIsEmailNotEnabled] = useState(() => {
    return JSON.parse(localStorage.getItem('isEmailNotEnabled')) || false;
  });

  useEffect(() => {
    localStorage.setItem('is2FAEnabled', JSON.stringify(is2FAEnabled));
  }, [is2FAEnabled]);

  useEffect(() => {
    localStorage.setItem('isEmailNotEnabled', JSON.stringify(isEmailNotEnabled));
  }, [isEmailNotEnabled]);

  const handle2FAToggleClick = () => {
    setIs2FAEnabled(!is2FAEnabled);
  };

  // const  = (userData) => {
  //   const { setUser } = useUser();
  //   setUser(userData); // userData should contain the user's name
  // };

  const handleEmailNotToggleClick = () => {
    setIsEmailNotEnabled(!isEmailNotEnabled);
  };


  const handleQuantityChange = (productId, change) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + change)
    }));
  };

  const handleAddToCart = (item) => {
    const itemWithQuantity = {
      ...item,
      quantity: quantities[item.productId] || 1,
      _id: item.productId
    };

    addToCart(itemWithQuantity);
  };

  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    address: ''
  });

  const [isSaved, setIsSaved] = useState(false);
  const [activeSection, setActiveSection] = useState('personalInformation');

  useEffect(() => {
    if (location.state && location.state.section) {
      setActiveSection(location.state.section);
    }
  }, [location.state]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(wishlist.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  };

  const handleSaveDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(USERS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetails)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('User details saved successfully:', result);
      setIsSaved(true);
      alert('Details successfully saved!');

    } catch (error) {
      console.error('Error saving user details:', error);
      alert('Error saving details. Please try again.');
    }
  };

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return wishlist.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'personalInformation':
        return (
          <form className="details" onSubmit={handleSaveDetails}>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={userDetails.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={userDetails.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={userDetails.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="emailAddress">Email Address:</label>
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                placeholder="Enter your email address"
                value={userDetails.emailAddress}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your address"
                value={userDetails.address}
                onChange={handleInputChange}
              />
            </div>
            {!isSaved && (
              <button type="submit" className='save-button'>Save Details</button>
            )}
          </form>
        );
      case 'wishlist':
        return (
          <div id="wishlist" className="wishlist-container">
            <section className="grid-section">
              <div className="grid-container">
                {getCurrentPageItems().map((item, index) => (
                  <div key={index} className="grid-item" style={{ cursor: 'pointer' }}>
                    <CiSquareMinus
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromWishlist(item.productId);
                      }}
                      style={{ color: 'red' }}
                    />
                    <Link to={`/product/${item.productId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div className="product-image-container">
                        {item.image ? (
                          <img src={`http://localhost:8000${item.image}`} alt={item.name} className="product-image" />
                        ) : (
                          <span className="image-placeholder">Image not available</span>
                        )}
                      </div>
                    </Link>
                    <p className="product-name">{item.name}</p>
                    <p className="product-cost">Ksh{item.price}</p>
                    <button
                      className="btn btn-dark"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
              <div className="grid-pagination">
                <div className="pagination-arrows" onClick={() => handlePageChange(currentPage - 1)}>
                  {currentPage > 1 && <IoIosArrowRoundBack />}
                </div>
                {[...Array(totalPages)].map((_, pageIndex) => (
                  <div
                    key={pageIndex + 1}
                    className={`grid-number ${currentPage === pageIndex + 1 ? "active" : ""}`}
                    onClick={() => handlePageChange(pageIndex + 1)}
                  >
                    {pageIndex + 1}
                  </div>
                ))}
                <div className="pagination-arrows" onClick={() => handlePageChange(currentPage + 1)}>
                  {currentPage < totalPages && <IoIosArrowRoundForward />}
                </div>
              </div>
            </section>
          </div>
        );
      case 'notifications':
        return <div>Notifications settings will be displayed here.</div>;
      case 'settings':
        return <div className="settings">
          <div className="appearance">
            <h3>Appearance</h3>
            <p>Customize your theme looks on your device</p>
          </div>
          <div className="language">
            <h3>Language</h3>
            <p>Select your language</p>
          </div>
          <div className="2FA">
            <h3>Two-factor Authentication</h3>
            <p>Keep your account secure by enabling 2FA</p>
            {is2FAEnabled ? (
              <BsToggleOn className="toggle-button" onClick={handle2FAToggleClick} />
            ) : (
              <BsToggleOff className="toggle-button" onClick={handle2FAToggleClick} />
            )}
          </div>
          <div className="email-not">
            <h3>Email Notifications</h3>
            <p>Receive email notifications</p>
            {isEmailNotEnabled ? (
              <BsToggleOn className="toggle-button" onClick={handleEmailNotToggleClick} />
            ) : (
              <BsToggleOff className="toggle-button" onClick={handleEmailNotToggleClick} />
            )}
          </div>
        </div>;
      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  return (
    <div>
      <header><Header /></header>
      <main>
        <div className="sidebar">
          <div className="display-image-container">
            <img src={carouselImage} alt="User Carousel" className="display-image" />
          </div>
          <ul>
            <li
              className={activeSection === 'personalInformation' ? 'active' : ''}
              onClick={() => setActiveSection('personalInformation')}
            >
              <FiUser className='icon' />Personal Information
            </li>
            <li
              className={activeSection === 'wishlist' ? 'active' : ''}
              onClick={() => setActiveSection('wishlist')}
            >
              <MdFavoriteBorder className='icon' />My Wishlist
            </li>
            <li
              className={activeSection === 'notifications' ? 'active' : ''}
              onClick={() => setActiveSection('notifications')}
            >
              <IoMdNotificationsOutline className='icon' />Notifications
            </li>
            <li
              className={activeSection === 'settings' ? 'active' : ''}
              onClick={() => setActiveSection('settings')}
            >
              <IoSettingsOutline className='icon' />Settings
            </li>
          </ul>
        </div>
        <div className="userdetails">
          {activeSection === 'personalInformation' && (
            <div className="top">
              <div className="display-image-container-top">
                <img src={carouselImage} alt="User Carousel" className="display-image-top" />
              </div>
              <button className='edit-button'>Edit Profile</button>
            </div>
          )}
          {renderContent()} {/* Render content based on active section */}
        </div>
      </main>
      <footer><Footer /></footer>
    </div>
  );
}

export default UserProfile;
