import React, { useState, useContext } from 'react';
import './HomepageCSS/ProductListing.css';
import { useCart } from '../context/CartContext';

const ProductListing = () => {
  const [selectedTab, setSelectedTab] = useState('Latest');
  const { addToCart } = useCart();


  const latestItems = [
    { id: 1, name: "Latest Product 1", price: 500, image: "path/to/image1" },
    { id: 2, name: "Latest Product 2", price: 700, image: "path/to/image2" },
    { id: 3, name: "Latest Product 3", price: 600, image: "path/to/image2" },
    { id: 4, name: "Latest Product 4", price: 400, image: "path/to/image2" },
  ];

  const bestSellersItems = [
    { id: 3, name: "Best Seller Product 1", price: 800, image: "path/to/image3" },
    { id: 4, name: "Best Seller Product 2", price: 900, image: "path/to/image4" },
  ];

  const featuredItems = [
    { id: 5, name: "Featured Product 1", price: 1000, image: "path/to/image5" },
  ];

  const tabs = ['Latest', 'Best Sellers', 'Featured'];

  const getItemsForSelectedTab = () => {
    let items;
    switch (selectedTab) {
      case 'Latest':
        items = latestItems;
        break;
      case 'Best Sellers':
        items = bestSellersItems;
        break;
      case 'Featured':
        items = featuredItems;
        break;
      default:
        items = [];
    }

    return items;
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
          <div key={item.id} className="product-item-example">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>Price: Ksh{item.price}</p>
            <button onClick={() => addToCart(item)}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
