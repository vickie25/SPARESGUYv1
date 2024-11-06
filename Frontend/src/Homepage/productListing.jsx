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

  return (
    <div className="product-section">
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={selectedTab === tab ? 'active' : ''}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="products-example">
        {getItemsForSelectedTab().map(item => (
          <div key={item._id} className="product-item-example">
            <img src={`http://localhost:8000${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>Price: Ksh {item.price}</p>
            <button onClick={() => addToCart({ ...item, quantity: 1 })}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
