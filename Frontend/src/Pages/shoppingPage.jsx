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
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedBrands, setCheckedBrands] = useState([]);
  const [checkedConditions, setCheckedConditions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const productsPerPage = 9;

  const toggleCategory = (item) => {
    setCheckedCategories((prevState) =>
      prevState.includes(item)
        ? prevState.filter((category) => category !== item)
        : [...prevState, item]
    );
  };

  const toggleBrand = (item) => {
    setCheckedBrands((prevState) =>
      prevState.includes(item)
        ? prevState.filter((brand) => brand !== item)
        : [...prevState, item]
    );
  };

  const toggleCondition = (item) => {
    setCheckedConditions((prevState) =>
      prevState.includes(item)
        ? prevState.filter((condition) => condition !== item)
        : [...prevState, item]
    );
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
  };

  const filterProducts = () => {
    const filtered = products.filter((product) => {
      const isCategoryMatch = checkedCategories.length === 0 || checkedCategories.includes(product.category);
      const isBrandMatch = checkedBrands.length === 0 || checkedBrands.includes(product.brand);
      const isConditionMatch = checkedConditions.length === 0 || checkedConditions.includes(product.condition);
      const isPriceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];

      return isCategoryMatch && isBrandMatch && isConditionMatch && isPriceMatch;
    });
    setFilteredProducts(filtered);
  };

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
    filterProducts();
  }, [checkedCategories, checkedBrands, checkedConditions, priceRange, products]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const isInWishlist = (itemId) => wishlist.some(item => item.productId === itemId);

  return (
    <div className="page-wrap">
      <header>
        <Header />
      </header>
      <div className='page-filter-showing'>
        <div className='page-location'>
          <h2>{location.pathname}</h2>
          {!searchQuery && <p>All products</p>}
        </div>
        <div className='filter-showing'>
          <div className="showing-info">
            <div className="showing-ico" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <IoFilterOutline /> Filter
            </div>
            <span className="vertical-line"></span>
            <p>Showing {indexOfFirstProduct + 1} -- {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length}</p>
          </div>
        </div>
      </div>

      <main>
        <section className="grid-section">
          <div style={{ fontSize: '24px' }} className="filter-icon">
            Filter <IoFilterOutline />
          </div>

          {/* Sidebar Filters (always visible) */}
          <div className="sidebar-filters">
            <div className="filter-category">
              <h3>Categories</h3>
              <ul>
                {['Electronics', 'Furniture', 'Clothing'].map((category, index) => (
                  <li key={index} onClick={() => toggleCategory(category)}>
                    <input type="checkbox" checked={checkedCategories.includes(category)} />
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            <div className="filter-brand">
              <h3>Brands</h3>
              <ul>
                {['Brand A', 'Brand B', 'Brand C'].map((brand, index) => (
                  <li key={index} onClick={() => toggleBrand(brand)}>
                    <input type="checkbox" checked={checkedBrands.includes(brand)} />
                    {brand}
                  </li>
                ))}
              </ul>
            </div>
            <div className="filter-condition">
              <h3>Condition</h3>
              
                {['New', 'Used', 'Refurbished'].map((condition, index) => (
                  <li key={index} onClick={() => toggleCondition(condition)}>
                    <input type="checkbox" checked={checkedConditions.includes(condition)} />
                    {condition}
                  </li>
                ))}
             
            </div>
            <div className="filter-price">
              <h3>Price Range</h3>
              <Slider
                range
                min={0}
                max={100000}
                value={priceRange}
                onChange={handlePriceChange}
                marks={{
                  0: '0',
                  25000: '25K',
                  50000: '50K',
                  75000: '75K',
                  100000: '100K',
                }}
              />
              <p>Price: Ksh {priceRange[0]} - Ksh {priceRange[1]}</p>
            </div>
          </div>

          {currentProducts.map((item, index) => (
            <div key={index} className="grid-item">
              {isInWishlist(item._id) ? (
                <MdFavorite onClick={() => removeFromWishlist(item._id)} style={{ color: 'red' }} />
              ) : (
                <MdFavoriteBorder onClick={() => addToWishlist(item)} />
              )}
              <Link to={`/product/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="product-image-container">
                  {item.image ? <img src={`http://localhost:8000${item.image}`} alt={item.name} className="product-image" /> : <span className="image-placeholder">Image not available</span>}
                </div>
                <p className="product-name">{item.name}</p>
                <p className="product-cost" style={{ color: '#000', fontSize: '1.2em', fontWeight: 'regular' }}>Ksh {item.price}</p>
              </Link>
              <button className="add-to-cart-button" onClick={() => addToCart({ ...item, quantity: 1 })}>Add to Cart</button>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <p>No products match your search criteria.</p>
          )}
        </section>

        <section className="pagination-section">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}><IoIosArrowRoundBack /></button>
          <span>{currentPage} of {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}><IoIosArrowRoundForward /></button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ShoppingPage;
