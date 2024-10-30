import React, { useState, useEffect, useContext } from 'react';
import "./PagesCSS/shoppingPage.css";
import { IoCheckboxOutline, IoSquareOutline, IoFilterOutline } from "react-icons/io5";
import { PiNumberSquareOneLight, PiNumberSquareTwoLight, PiNumberSquareThreeLight } from "react-icons/pi";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import Slider from 'rc-slider';
import { HiOutlineTrophy } from "react-icons/hi2";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { BiSupport } from "react-icons/bi";
import { RiHandCoinFill } from "react-icons/ri";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import 'rc-slider/assets/index.css';
import Footer from '../Homepage/Footer';
import Header from '../Homepage/Header';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { SearchContext } from '../context/SearchContext';
import { useWishlist } from '../context/WishlistContext';

const ShoppingPage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const context = useContext(SearchContext);
  const searchQuery = context?.searchQuery || '';
  const [cart, setCart] = useState(() => {
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
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery)
  );


  // Filter items based on the search query
  // const filteredItems = items.filter(item =>
  //   item.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );


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

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.productId === product._id);

      if (existingItem) {
        return prevCart.map(item =>
          item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, {
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        }];
      }
    });
  };

  const isInWishlist = (itemId) => {
    return wishlist.some(item => item.productId === itemId);
  };

  useEffect(() => {
    if (cart.length > 0) {
      const updateCartInDatabase = async () => {
        const cartId = 'actual-cart-id'; // Ensure this is valid or dynamically fetched
        const productData = {
          cartId,
          products: cart.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          totalAmount: calculateSubtotal(),
        };

        try {
          await axios.post('http://localhost:8000/api/cart/save', productData);
          console.log('Cart updated and saved to database successfully!');
        } catch (error) {
          console.error('Error updating cart in database', error);
        }
      };

      updateCartInDatabase();
    }
  }, [cart, calculateSubtotal]);


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

        <Header />
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

          </div>
        </aside>

        <section className="grid-section">
          <div style={{ fontSize: '24px' }} className="filter-icon" onClick={toggleSidebar}>
            Filter< IoFilterOutline />
          </div>

          {filteredProducts.map((item, index) => (
            <div key={index} className="grid-item" style={{ cursor: 'pointer' }}>
              {isInWishlist(item._id) ? (
                <MdFavorite onClick={() => removeFromWishlist(item._id)} style={{ color: 'red' }} />
              ) : (
                <MdFavoriteBorder onClick={() => addToWishlist(item)} />
              )}
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
              <button className="add-to-cart-button" onClick={(e) => { e.stopPropagation(); addToCart({ ...item, quantity: 1 }); }}>
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

export default ShoppingPage;
