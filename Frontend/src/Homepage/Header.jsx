import React, { useState, useContext } from 'react';
import { FaBars, FaTimes, FaRegHeart, FaRegUser } from 'react-icons/fa';
import { BsCart3 } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { SearchContext } from '../context/SearchContext';
import CartDropdown from '../Pages/CartDropdown';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const { cart } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
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
          <li>
            <div className="search-container">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="search-input"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </li>
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
            <CartDropdown isDropdownVisible={isDropdownVisible} toggleDropdown={toggleDropdown} />
          </li>
          <li>Notification</li>
          <li><Link to="/UserProf"><FaRegUser className='header-icon' /></Link></li>
          <li>Login</li>
        </ul>
      </nav>
      {isDropdownVisible && <div className="mask"></div>}
    </header>
  );
};

export default Header;
