import React from 'react';
import { CartProvider } from './context/CartContext';  // Import the CartProvider
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <CartProvider>
      <Outlet />
    </CartProvider>
  );
}

export default App;
