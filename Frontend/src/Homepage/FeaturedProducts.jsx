import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './HomepageCSS/FeaturedProducts.css';
import plugs from './HomepageImages/plugs.svg'
import rearlights from './HomepageImages/rearlights.svg'

const FeaturedProducts = () => {
  const products = [
    {
      name: 'Air filter',
      imageUrl: './HomepageImages/plugs.svg',
      discountPercentage: 20,
      originalPrice: 295,
      discountedPrice: 235,
      rating: 4
    },
    {
      name: 'Tail light',
      imageUrl: './HomepageImages/rearlights.svg',
      discountPercentage: 20,
      originalPrice: 295,
      discountedPrice: 235,
      rating: 4
    }
  ];

  return (
    <div className="promotional-section">
      <div className="promotion-banner">
        <h1 className="h1">HURRY UP</h1>
        <p  className="h1">20% OFF ANY TOYOTA PRODUCT</p>
        <p  className="h1">THIS WEEK ONLY SHOPPING DAYS</p>
        <h2  className="h1">73 HOURS TO GO!</h2>
        <button className="explore-more-btn">Explore More</button>
      </div>
      <div className="products">
        {products.map((product, index) => (
          <div key={index} className="product-item">
            <img src={product.imageUrl} alt={product.name} />
            <div className="product-details">
              <span className="discount-badge">-{product.discountPercentage}%</span>
              <h3>{product.name}</h3>
              <p className="price">
                <span className="discounted-price">KSh{product.discountedPrice}</span>
                <span className="original-price">KSh{product.originalPrice}</span>
              </p>
              <div className="rating">
                {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;