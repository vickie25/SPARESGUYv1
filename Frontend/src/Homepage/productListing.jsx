import React from 'react';
import { useState } from 'react';
import './HomepageCSS/ProductListing.css';


const ProductListing = () => {
  const [selectedTab, setSelectedTab] = useState('Latest');

  const items = [
    { id: 1, name: "Product 1", price: 500, image: "path/to/image1" },
    { id: 2, name: "Product 2", price: 700, image: "path/to/image2" },
    { id: 3, name: "Product 3", price: 800, image: "path/to/image3" },
    { id: 4, name: "Product 4", price: 900, image: "path/to/image4" }
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
      <div className="products-example">
        {items.map(item => (
          <div key={item.id} className="product-item-example">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>Price: Ksh{item.price}</p>
            <button>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
