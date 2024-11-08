import React, { useEffect, useState } from 'react';
import './HomepageCSS/FeaturedProducts.css';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const [discountedItems, setDiscountedItems] = useState([]);
  const [timeLeft, setTimeLeft] = useState('');
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    // Fetch products from the backend
    axios.get('http://localhost:8000/api/products')
      .then(response => {
        const products = response.data;
        const itemsWithDiscount = products.filter(product => product.hasDiscount);
        setDiscountedItems(itemsWithDiscount);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const endDate = new Date('2024-12-31T23:59:59'); // Replace with actual discount end date
      const timeDifference = endDate - now;

      if (timeDifference <= 0) {
        clearInterval(interval);
        setTimeLeft('Discount period has ended');
      } else {
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDifference / 1000) % 60);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="promotional-section">
      <div className="promotion-banner">
        <h2 className="h2">HURRY UP</h2>
        <h2 className="h2">ANY TOYOTA PRODUCT</h2>
        <h2 className="h2">THIS WEEK ONLY SHOPPING DAYS</h2>
        <h1 className="number">{timeLeft}</h1>
        <button className="explore-more-btn" onClick={toggleShowMore}>
          {showMore ? 'Show Less' : 'Explore More'}
        </button>
      </div>
      <div className="products">
        {discountedItems.slice(0, 2).map(item => {
          const discountedPrice = item.price - (item.price * (item.discountPercentage / 100));
          return (
            <div key={item._id} className="product-item">
              <div className="discount-badge">{item.discountPercentage}% OFF</div>
              <img src={`http://localhost:8000${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p className="original-price"> Ksh {item.price}</p>
              <p>Ksh {discountedPrice.toFixed(2)}</p>
              <button onClick={() => addToCart({ ...item, quantity: 1 })}>Add to cart</button>
            </div>
          );
        })}
      </div>
      {showMore && (
        <div className="products">
          {discountedItems.slice(2).map(item => {
            const discountedPrice = item.price - (item.price * (item.discountPercentage / 100));
            return (
              <div key={item._id} className="product-item">
                <Link to={`/product/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="discount-badge">{item.discountPercentage}% OFF</div>
                  <img src={`http://localhost:8000${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p className="original-price"> Ksh {item.price}</p>
                  <p>Ksh {discountedPrice.toFixed(2)}</p>
                </Link>
                <button className="add-to-cart-button" onClick={(e) => { e.stopPropagation(); addToCart({ ...item, quantity: 1 }); }}>
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;
