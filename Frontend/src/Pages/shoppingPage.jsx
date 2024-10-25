import React, { useEffect, useState, useMemo } from 'react';
import "./PagesCSS/shoppingPage.css";
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { IoCheckboxOutline, IoSquareOutline, IoFilterOutline } from "react-icons/io5";
import { PiNumberSquareOneLight, PiNumberSquareTwoLight, PiNumberSquareThreeLight } from "react-icons/pi";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import Slider from 'rc-slider';
import { HiOutlineTrophy } from "react-icons/hi2";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { BiSupport } from "react-icons/bi";
import { RiHandCoinFill } from "react-icons/ri";
import 'rc-slider/assets/index.css';
import Footer from '../Homepage/Footer'
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import { useCart } from '../context/CartContext.jsx';


const PageLayout = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const { cartItems, removeItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const productsPerPage = 9;
  const itemsPerPage = 9;
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const items = [
  ];


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);


  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Filter products based on search query using useMemo for performance
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchTerm) ||
        item.price.toString().includes(searchTerm)
      );
    });
  }, [products, searchQuery]);

  // Filter items based on the search query
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleCategory = async (condition) => {
    const newCheckedCategories = checkedCategories.includes(condition)
      ? checkedCategories.filter((cat) => cat !== condition)
      : [...checkedCategories, condition];

    setCheckedCategories(newCheckedCategories);

    // Fetch items based on the selected condition
    if (newCheckedCategories.includes(condition)) {
      const response = await axios.get('/api/items', { params: { condition } });
      setFilteredItems(response.data);
    } else {
      setFilteredItems([]);
    }
  };

  const handlePriceChange = (value) => setPriceRange(value);

  // Handle search input changes
  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Calculate the subtotal
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calculating the indices for slicing the product array
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Function to add a product to the cart
  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = async (product) => {
    setCart((prevCart) => {
      // Check if the product already exists in the cart
      const existingItem = prevCart.find(item => item.productId === product._id);

      if (existingItem) {
        // If it exists, update the quantity
        return prevCart.map(item =>
          item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If it doesn't exist, add it as a new item
        return [...prevCart, {
          productId: product._id,  // Explicitly set productId
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        }];
      }
    });

    // Rest of your code for backend communication...
    const cartId = 'your-cart-id';
    const productData = {
      cartId,
      productId: product._id,
      quantity: 1,
      totalAmount: calculateSubtotal(),
    };

    try {
      await axios.post('http://localhost:8000/api/cart/add', productData);
    } catch (error) {
      console.error('Error adding product to cart in database', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      // Update frontend state
      setCart(prevCart => prevCart.filter(item => item.productId !== productId));

      // Delete from backend
      await axios.delete(`http://localhost:8000/api/cart/remove/${productId}`);
    } catch (error) {
      console.error('Error deleting product from cart:', error);
      // Optionally revert the cart state if backend delete fails
      // You might want to show an error message to the user
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleProductClick = (item) => {
    navigate(`/product`, { state: { product: item } });
  };

  const isLoggedIn = false; // Replace this with your actual login check

  const handleCheckout = async () => {
    const cartData = {
      products: cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      totalAmount: calculateSubtotal(),
    };

    try {
      await axios.post('http://localhost:8000/api/cart/save', cartData);
      console.log('Cart saved successfully!');
      navigate('/checkout'); // Redirect to checkout page
    } catch (error) {
      console.error('Error saving cart to database', error);
      alert('Error saving cart. Please try again.');
    }
  };

  return (
    <div className="page-wrap">
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
            <li> <div className="search-container">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="search-input"
                value={searchQuery}
                onChange={handleSearch}
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
                        <div key={item.productId} className="cart-dropdown-item">
                          <img src={`http://localhost:8000${item.image}`} alt={item.name} className="cart-item-image" />
                          <div className="cart-item-details">
                            <h4>{item.name}</h4>
                            <p><b>{item.quantity} * Ksh{item.price} </b></p>
                            <p><b>Total: Ksh{item.price * item.quantity}</b></p>
                          </div>
                          <button onClick={() => handleDelete(item.productId)} className="delete-button">
                            <RiDeleteBin6Line />
                          </button>
                        </div>
                      ))}

                      <div className="cart-subtotal">
                        <p>Subtotal: <strong>Ksh{calculateSubtotal()}</strong></p>
                      </div>
                      <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
                    </div>
                  )}
                </div>

              )}
            </li>
            <li><Link to="/UserProf"><FaRegUser className='header-icon' /></Link></li>
          </ul>
        </nav>
      </header>
      {isDropdownVisible && <div className="mask"></div>}
      <div className='page-filter-showing'>
        <div className='page-location'>
          <h2>{location.pathname}</h2>
          {!isFilterApplied && searchQuery === '' && <p>All products</p>}
        </div>
        <div className='filter-showing'>


          <div className="showing-info">
            {/* Filter text with an icon */}
            <div className="showing-ico" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <IoFilterOutline />  Filter
            </div>

            {/* Vertical line */}
            <span className="vertical-line"></span>

            {/* Showing text */}
            <p>Showing {startIndex} -- {filteredProducts.length} of {filteredProducts.length}</p>

          </div>
        </div>
      </div>

      <main className={isDropdownVisible ? 'blur' : ''}>
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="categories-container">
            <h3>Product Categories</h3>
            <ul>
              {['Body Parts', 'Engine Parts', 'Electrical Components', 'Suspension Parts', 'Transmission Parts'].map((category) => (
                <li key={category} onClick={() => toggleCategory(category)}>
                  {checkedCategories.includes(category) ? <IoCheckboxOutline /> : <IoSquareOutline />} {category}
                </li>
              ))}
            </ul>
          </div>

          <div className="categories-container">
            <h3>Filter by brand</h3>
            <ul>
              {['Nissan', 'Subaru', 'Hyundai', 'Toyota', 'Vovlo', 'Mercedes-Benz'].map((brand) => (
                <li key={brand} onClick={() => toggleCategory(brand)}>
                  {checkedCategories.includes(brand) ? <IoCheckboxOutline /> : <IoSquareOutline />} {brand}
                </li>
              ))}
            </ul>
          </div>

          <div className="categories-container">
            <h3>Filter by price range</h3>
            <Slider
              range
              min={0}
              max={10000}
              defaultValue={[0, 10000]}
              value={priceRange}
              onChange={handlePriceChange}
              trackStyle={{ backgroundColor: 'black' }}
              handleStyle={{ borderColor: 'black', backgroundColor: 'black' }}
              railStyle={{ backgroundColor: '#ccc' }}
            />
            <div>Price: Ksh{priceRange[0]} - Ksh{priceRange[1]}</div>
          </div>
          <div className="categories-container">
            <h3>Filter by condition</h3>
            <ul>
              {['New', 'Used', 'Refurbished'].map((condition) => (
                <li key={condition} onClick={() => toggleCategory(condition)}>
                  {checkedCategories.includes(condition) ? <IoCheckboxOutline /> : <IoSquareOutline />} {condition}
                </li>
              ))}
            </ul>
            <div className="filtered-items">
              {filteredItems.map((item) => (
                <div key={item.id}>{item.name}</div>
              ))}
            </div>
          </div>
        </aside>

        <section className="grid-section">
          <div style={{ fontSize: '24px' }} className="filter-icon" onClick={toggleSidebar}>
            Filter< IoFilterOutline />
          </div>

          {currentItems.map((item, index) => (
            <div key={index} className="grid-item" style={{ cursor: 'pointer' }}>
              <Link to={`/product/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="product-image-container">
                  {item.image ? (
                    <img src={`http://localhost:8000${item.image}`} alt={item.name} className="product-image" />
                  ) : (
                    <span className="image-placeholder">Image not available</span>
                  )}
                </div>
                <p className="product-name">{item.name}</p>
                <p className="product-cost">Ksh {item.price}</p>
              </Link>
              <button className="add-to-cart-button" onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}>
                Add to Cart
              </button>
            </div>
          ))}

          {filteredProducts.length === 0 && searchQuery && (
            <div className="no-results">
              <p>No products found matching "{searchQuery}"</p>
            </div>
          )}
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
                {pageIndex === 0 && <PiNumberSquareOneLight />}
                {pageIndex === 1 && <PiNumberSquareTwoLight />}
                {pageIndex === 2 && <PiNumberSquareThreeLight />}
              </div>
            ))}

            <div className="pagination-arrows" onClick={() => handlePageChange(currentPage + 1)}>
              {currentPage < totalPages && <IoIosArrowRoundForward />}
            </div>
          </div>
        </section>
      </main>

      <div className="benefits">
        <div className='benefit'>
          <HiOutlineTrophy /><div className="text"><h3>High Quality</h3>
            <p>Crafted from top materials</p></div>
        </div>
        <div className='benefit'>
          <HiOutlineCheckBadge /><div className="text"><h3>Warranty Protection</h3>
            <p>Over 2 years</p></div></div>
        <div className='benefit'>
          <RiHandCoinFill />
          <div className="text"><h3>Free Shipping</h3>
            <p>Order over 150</p>
          </div>
        </div>
        <div className='benefit'>
          <BiSupport /><div className="text"><h3>24 / 7 Support</h3>
            <p>Dedicated support</p></div>
        </div>
      </div>


      <footer>
        <Footer />
      </footer>
    </div>

  );
};

export default PageLayout;
