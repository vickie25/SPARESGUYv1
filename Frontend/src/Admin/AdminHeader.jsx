import React, { useState, useEffect } from 'react';
import Header from '../Homepage/Header';
import Footer from '../Homepage/Footer';
import { useLocation } from 'react-router-dom';
import { FiUser } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { BsToggleOff } from "react-icons/bs";
import { BsToggleOn } from "react-icons/bs";
import carouselImage from '../Homepage/HomepageImages/defaultuser.png';
import { Link } from 'react-router-dom';
// In your login function or component

const AdminHeader = () => {
  const location = useLocation();

  // useEffect(() => {
  //   localStorage.setItem('is2FAEnabled', JSON.stringify(is2FAEnabled));
  // }, [is2FAEnabled]);

  // useEffect(() => {
  //   localStorage.setItem('isEmailNotEnabled', JSON.stringify(isEmailNotEnabled));
  // }, [isEmailNotEnabled]);

  // const handle2FAToggleClick = () => {
  //   setIs2FAEnabled(!is2FAEnabled);
  // };

  // const  = (userData) => {
  //   const { setUser } = useUser();
  //   setUser(userData); // userData should contain the user's name
  // };

  // const handleEmailNotToggleClick = () => {
  //   setIsEmailNotEnabled(!isEmailNotEnabled);
  // };
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
  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese, Swahili'];
 
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
      case 'notifications':
        return <div>Notifications settings will be displayed here.</div>;
      case 'settings':
        return <div className="settings">
          <div className="appearance">
            <h3>Appearance</h3>
            <p>Customize your theme looks on your device</p>
          </div>
        
return (
  <div className="language">
    <h3>Language</h3>
    <p>Select your language</p>
    <select id="language-selector" name="language" onChange={handleLanguageChange}>
      {languages.map((language, index) => (
        <option key={index} value={language}>
          {language}
        </option>
      ))}
    </select>
  </div>
);

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
      <div>
      <div className="wishlist-container">
        {getCurrentPageItems().map((item, index) => (
          <div key={index} className="wishlist-item">
            <p>{item.name}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, pageIndex) => (
          <button
            key={pageIndex}
            className={pageIndex + 1 === currentPage ? "active" : ""}
            onClick={() => handlePageChange(pageIndex + 1)}
          >
            {pageIndex + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
}

export default AdminHeader;
=======
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaBell, 
  FaEnvelope, 
  FaUserCircle,
  FaMoon,
  FaSun,
  FaSignOutAlt
} from 'react-icons/fa';


const AdminHeader = () => {
  const [isDark, setIsDark] = useState(false);
  const [notifications] = useState(3);
  const [messages] = useState(5);

  const toggleTheme = () => {
    setIsDark(!isDark);
    // You can implement your theme switching logic here
  };

  return (
    <HeaderContainer isDark={isDark}>
      <HeaderContent>
        <SearchBar isDark={isDark}>
          <FaSearch />
          <input 
            type="text" 
            placeholder="Search..." 
            aria-label="Search"
          />
        </SearchBar>

        <ActionButtons>
          <IconButton
            isDark={isDark}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </IconButton>

          <IconButton
            isDark={isDark}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaBell />
            {notifications > 0 && (
              <NotificationBadge>{notifications}</NotificationBadge>
            )}
          </IconButton>

          <IconButton
            isDark={isDark}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope />
            {messages > 0 && (
              <NotificationBadge>{messages}</NotificationBadge>
            )}
          </IconButton>

          <UserProfile isDark={isDark}>
            <div className="user-info">
              <div className="name">apbc</div>
              <div className="role">Administrator</div>
            </div>
            <IconButton
              isDark={isDark}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUserCircle />
            </IconButton>
            <IconButton
              isDark={isDark}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSignOutAlt />
            </IconButton>
          </UserProfile>
        </ActionButtons>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default AdminHeader;


const HeaderContainer = styled.header`
  background: ${props => props.isDark ? '#1a1a1a' : '#ffffff'};
  border-bottom: 2px solid ${props => props.isDark ? '#2d2d2d' : '#f0f0f0'};
  padding: 1rem 2rem;
   position: 'fixed',
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const SearchBar = styled.div`
  position: relative;
  flex: 0 1 400px;

  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 3rem;
    border: none;
    border-radius: 50px;
    background: ${props => props.isDark ? '#2d2d2d' : '#f5f5f5'};
    color: ${props => props.isDark ? '#ffffff' : '#333333'};
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #DAA520;
      background: ${props => props.isDark ? '#333333' : '#ffffff'};
    }
  }

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #DAA520;
    font-size: 1.2rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const IconButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: ${props => props.isDark ? '#ffffff' : '#333333'};
  font-size: 1.2rem;
  padding: 0.5rem;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    color: #DAA520;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.4rem;
  font-size: 0.7rem;
  font-weight: bold;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-left: 1.5rem;
  border-left: 2px solid ${props => props.isDark ? '#2d2d2d' : '#f0f0f0'};

  .user-info {
    display: none;
    @media (min-width: 768px) {
      display: block;
    }
  }

  .name {
    font-weight: 600;
    color: ${props => props.isDark ? '#ffffff' : '#333333'};
  }

  .role {
    font-size: 0.8rem;
    color: ${props => props.isDark ? '#cccccc' : '#666666'};
  }
`;
