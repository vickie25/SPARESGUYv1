import React, { useState, useEffect } from 'react';
import './HomepageCSS/ProductListing.css';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const ProductListing = () => {
  const [selectedTab, setSelectedTab] = useState('Latest');
  const { addToCart } = useCart();
  const [latestItems, setLatestItems] = useState([]);
  const [bestSellersItems, setBestSellersItems] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch products from the backend
    axios.get('http://localhost:8000/api/products')
      .then(response => {
        const products = response.data;
        setLatestItems(products.filter(product => product.isLatest));
        setBestSellersItems(products.filter(product => product.isBestSeller));
        setFeaturedItems(products.filter(product => product.isFeatured));
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const tabs = ['Latest', 'Best Sellers', 'Featured'];

  const getItemsForSelectedTab = () => {
    switch (selectedTab) {
      case 'Latest':
        return latestItems;
      case 'Best Sellers':
        return bestSellersItems;
      case 'Featured':
        return featuredItems;
      default:
        return [];
    }
  };

  const handleNext = () => {
    const items = getItemsForSelectedTab();
    if (currentIndex + 4 < items.length) {
      setCurrentIndex(currentIndex + 4);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 4 >= 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };

  return (
    <div className="product-section">
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={selectedTab === tab ? 'active' : ''}
            onClick={() => {
              setSelectedTab(tab);
              setCurrentIndex(0); // Reset index when tab changes
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="products-example">
        {currentIndex > 0 && (
          <button className="carousel-button" onClick={handlePrev}>
            &lt;
          </button>
        )}
        {getItemsForSelectedTab().slice(currentIndex, currentIndex + 4).map(item => (
          <div key={item._id} className="product-item-example">
            <img src={`http://localhost:8000${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>Price: Ksh {item.price}</p>
            <button onClick={() => addToCart({ ...item, quantity: 1 })}>Add to cart</button>
          </div>
        ))}
        {currentIndex + 4 < getItemsForSelectedTab().length && (
          <button className="carousel-button" onClick={handleNext}>
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
