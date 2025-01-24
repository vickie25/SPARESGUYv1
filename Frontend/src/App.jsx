import React from 'react';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';  // Ensure correct import
import { WishlistProvider } from './context/WishlistContext';  // Ensure correct import
import { Outlet } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ReactDOM from 'react-dom/client';
// import Header from './Homepage/Header';  // Import the Header component





 
function App() {
  return (
    <GoogleOAuthProvider clientId="881796254664-fc8l2k6pvsa02fe1fql5jqdjrihnpbvm.apps.googleusercontent.com">
    <CartProvider>
      <SearchProvider>
        <WishlistProvider>
          {/* <Header /> */}
          <Outlet />
        </WishlistProvider>
      </SearchProvider>
    </CartProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
