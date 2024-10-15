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
  const items = [
    { id: 1, name: "Product 1", price: 500, image: "path/to/image1" },
    { id: 2, name: "Product 2", price: 700, image: "path/to/image2" },
    { id: 3, name: "Product 3", price: 300, image: "path/to/image3" },
    { id: 4, name: "Product 4", price: 450, image: "path/to/image4" },
    { id: 5, name: "Product 5", price: 800, image: "path/to/image5" },
    { id: 6, name: "Product 6", price: 600, image: "path/to/image6" },
    { id: 7, name: "Product 7", price: 550, image: "path/to/image7" },
    { id: 8, name: "Product 8", price: 1000, image: "path/to/image8" },
    { id: 9, name: "Product 9", price: 350, image: "path/to/image9" },
    { id: 10, name: "Product 10", price: 750, image: "path/to/image10" },
    { id: 11, name: "Product 11", price: 900, image: "path/to/image11" },
    { id: 12, name: "Product 12", price: 650, image: "path/to/image12" },
    { id: 13, name: "Product 13", price: 300, image: "path/to/image13" },
    { id: 14, name: "Product 14", price: 500, image: "path/to/image14" },
    { id: 15, name: "Product 15", price: 850, image: "path/to/image15" },
    { id: 16, name: "Product 16", price: 400, image: "path/to/image16" },
    { id: 17, name: "Product 17", price: 700, image: "path/to/image17" },
    { id: 18, name: "Product 18", price: 250, image: "path/to/image18" },
    { id: 19, name: "Product 19", price: 950, image: "path/to/image19" },
    { id: 20, name: "Product 20", price: 550, image: "path/to/image20" },
    { id: 21, name: "Product 21", price: 300, image: "path/to/image21" },
    { id: 22, name: "Product 22", price: 450, image: "path/to/image22" },
    { id: 23, name: "Product 23", price: 600, image: "path/to/image23" },
    { id: 24, name: "Product 24", price: 750, image: "path/to/image24" },
    { id: 25, name: "Product 25", price: 500, image: "path/to/image25" },
    { id: 26, name: "Product 26", price: 800, image: "path/to/image26" },
    { id: 27, name: "Product 27", price: 950, image: "path/to/image27" }
  ];

  // Filter items based on the search query
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery)
  );

  // Handle search input changes
  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Function to get items for the current page and apply search filter
  const getCurrentPageItems = () => {
    const filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(searchQuery) // Search by name (you can adjust to search by other fields)
    );
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredItems.slice(startIndex, endIndex);
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
          <li><Link to="/UserProf"><FaRegUser className='header-icon' /></Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default PageLayout;
