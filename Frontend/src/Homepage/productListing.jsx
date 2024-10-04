import React from 'react';
import { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './HomepageCSS/ProductListing.css';
import rearlights from './Homepageimages/rearlights.svg'

const ProductListing = () => {
  const [selectedTab, setSelectedTab] = useState('Latest');

  const products = [
    { id: 1, name: 'Air Filter', price: '$235.00', imageUrl: '/path-to-air-filter-image.jpg' },
    { id: 2, name: 'Tail Light', price: '$235.00', imageUrl: '/path-to-tail-light-image.jpg' },
    // Add more products as needed
  ];

  const tabs = ['Latest', 'Best Sellers', 'Featured'];

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
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;