import React from 'react';
import './HomepageCSS/FeaturedProducts.css';

const items = [
  { id: 1, name: "Product 1", price: 500, image: "path/to/image1" },
  { id: 2, name: "Product 2", price: 700, image: "path/to/image2" }
];

const FeaturedProducts = () => {
  return (
    <div className="promotional-section">
      <div className="promotion-banner">
        <h2 className="h2">HURRY UP</h2>
        <h1 className="number">20% OFF </h1>
        <h2 className="h2">ANY TOYOTA PRODUCT</h2>
        <h2 className="h2">THIS WEEK ONLY SHOPPING DAYS</h2>
        <h1 className="number">73 HOURS TO GO!</h1> {/* Updated class to h2 */}
        <button className="explore-more-btn">Explore More</button>
      </div>
      <div className="products">
        {items.map(item => (
          <div key={item.id} className="product-item">
            <img src={item.image} alt={item.name} />
            <p >{item.name}</p> {/* Updated class to number */}
            <p>Price: Ksh{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
