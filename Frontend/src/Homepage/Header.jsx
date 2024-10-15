import React, { useState } from 'react';
import { FaBars, FaTimes, FaSearch, FaRegHeart, FaRegUser } from 'react-icons/fa';
import { BsCart3 } from 'react-icons/bs';
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from 'react-router-dom';

const PageLayout = () => {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleDelete = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <header>
      <nav>
        <div className="menu-toggle" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={isOpen ? 'nav-list active' : 'nav-list'}>
          <li><a href="/">Home</a></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact Us</a></li>
          <li> <div className="search-container"> <input
            type="text"
            placeholder="What are you looking for?"
            className="search-input"
            value={searchQuery}
            onChange={handleSearch} // Update search query on input change
          />
          </div></li>
          <li><Link to="/wishlist"><FaRegHeart className='header-icon' /></Link></li>
          <li className="cart-icon-container">
            <div className="cart-icon" onClick={toggleDropdown}>
              <BsCart3 />
              {cart.length > 0 && (
                <span className="cart-count">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </div>

            {/* Dropdown for cart items */}
            {isDropdownVisible && (
              <div className="cart-dropdown">
                {cart.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <div>
                    <h2>Order Summary</h2>
                    {cart.map((item) => (
                      <div key={item.id} className="cart-dropdown-item">
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-details">
                          <h4>{item.name}</h4>
                          <p><b>{item.quantity} * Ksh{item.price} </b></p>
                          <p><b>Total: Ksh{item.price * item.quantity}</b></p>
                        </div>
                        <button
                          onClick={() => handleDelete(item.id)} // Delete item
                          className="delete-button"
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    ))}

                    {/* Subtotal Calculation */}
                    <div className="cart-subtotal">
                      <p>Subtotal: <strong>Ksh{calculateSubtotal()}</strong></p>
                    </div>

                    {/* Checkout Button */}
                    <button className="checkout-button">Checkout</button>
                  </div>

                )}
              </div>
            )}
          </li>
          <li><Link to="/profile"><FaRegUser className='header-icon' /></Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default PageLayout;
