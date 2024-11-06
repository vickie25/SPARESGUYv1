import React, { useEffect, useState } from 'react';
import './HomepageCSS/FeaturedProducts.css';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const FeaturedProducts = () => {
  const { setCart } = useCart();
  const [discountedItems, setDiscountedItems] = useState([]);

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

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.productId === product._id);

      if (existingItem) {
        // Increment quantity by product's quantity
        return prevCart.map(item =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        return [...prevCart, {
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: product.quantity || 1 // Default to 1 if no quantity passed
        }];
      }
    });
  };

  return (
    <div className="promotional-section">
      <div className="promotion-banner">
        <h2 className="h2">HURRY UP</h2>
        <h1 className="number">20% OFF </h1>
        <h2 className="h2">ANY TOYOTA PRODUCT</h2>
        <h2 className="h2">THIS WEEK ONLY SHOPPING DAYS</h2>
        <h1 className="number">73 HOURS TO GO!</h1>
        <button className="explore-more-btn">Explore More</button>
      </div>
      <div className="products">
        {discountedItems.map(item => {
          const discountedPrice = item.price - (item.price * (item.discountPercentage / 100));
          return (
            <div key={item._id} className="product-item">
              <div className="discount-badge">{item.discountPercentage}% OFF</div>
              <img src={`http://localhost:8000${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p className="original-price"> Ksh {item.price}</p>
              <p>Ksh {discountedPrice.toFixed(2)}</p>
              <button className="add-to-cart-button" onClick={(e) => { e.stopPropagation(); addToCart({ ...item, quantity: 1 }); }}>
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
