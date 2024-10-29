import React, { useState, useEffect } from 'react';
import Header from '../Homepage/Header';
import Footer from '../Homepage/Footer';
import "./PagesCSS/userProfile.css";
import { useLocation } from 'react-router-dom';
import { FiUser } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import carouselImage from '../Homepage/HomepageImages/defaultuser.png';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';


// Update BASE_URL to your local API endpoint
export const BASE_URL = 'http://localhost:8000'; // Change this to the port your API runs on
export const USERS_URL = `${BASE_URL}/api/users`;

const UserProfile = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, change) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + change)
    }));
  };

  const handleAddToCart = (item) => {
    // Create a modified item with the selected quantity
    const itemWithQuantity = {
      ...item,
      quantity: quantities[item.productId] || 1,
      _id: item.productId // Ensure _id is set correctly for CartContext
    };

    addToCart(itemWithQuantity);
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(item.productId);
  };

  // State to hold user details
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    address: ''
  });

  // State to track whether the details have been saved
  const [isSaved, setIsSaved] = useState(false);

  // State to manage which section is active
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('personalInformation');
  useEffect(() => {
    if (location.state && location.state.section) {
      setActiveSection(location.state.section);
    }
  }, [location.state]);
  // State to hold wishlist items
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: "Product 1", price: 1200, image: "" },
    { id: 2, name: "Product 2", price: 2500, image: "" },
    { id: 3, name: "Product 3", price: 3000, image: "" },
    { id: 4, name: "Product 4", price: 1800, image: "" },
    { id: 5, name: "Product 5", price: 4200, image: "" },
    { id: 6, name: "Product 6", price: 2800, image: "" },
    // Add more items as needed
  ]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(wishlistItems.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  };

  // Handle form submission
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
    return wishlistItems.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleRemoveFromWishlist = (itemToRemove) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemToRemove.id)
    );
  };

  // Function to render the appropriate content based on active section
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
          <div className="wishlist-container">
            <h2>My Wishlist</h2>
            <section className="grid-section">
              <div className="grid-container">
                {wishlist.map((item) => (
                  <div key={item.productId} className="grid-item">
                    <button
                      className="remove-wishlist-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(item.productId);
                      }}
                    >
                      &minus;
                    </button>
                    <div className="product-image-container">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="product-image" />
                      ) : (
                        <span className="image-placeholder">Image not available</span>
                      )}
                    </div>
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
        return <div>Settings options will be displayed here.</div>;
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
