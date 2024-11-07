import React from 'react';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';  // Ensure correct import
import { WishlistProvider } from './context/WishlistContext';  // Ensure correct import
import { Outlet } from 'react-router-dom';
// import Header from './Homepage/Header';  // Import the Header component

function App() {
  return (
    <CartProvider>
      <SearchProvider>
        <WishlistProvider>
          {/* <Header /> */}
          <Outlet />
        </WishlistProvider>
      </SearchProvider>
    </CartProvider>
  );
}

export default App;
