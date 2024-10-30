import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Homepage from './Homepage/Homepage.jsx';
import Login from './Pages/login.jsx';
import Registration from './Pages/Registration.jsx';
import Shop from './Pages/shoppingPage.jsx';
import ProductDetail from './Pages/productDetail.jsx';
import CartPage from './Pages/cartPage.jsx';
import Review from './Pages/Reviews.jsx';
import UserProfile from './Pages/UserProfile.jsx';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import {Provider} from 'react-redux';
import store from './store.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkout from './Pages/Checkout.jsx';
import Payement from './Pages/Payement.jsx';
import PaymentConfirmation from './Pages/PaymentConfirmation.jsx';
import { CartProvider } from './context/CartContext.jsx'; // Correct import path

const routes = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/app" element={<App />} />
    <Route index={true} path='/' element={<Homepage />} />
    <Route path='/login' element={<Login />} />
    <Route path='/registration' element={<Registration />} />
    <Route path='/shop' element={<Shop />} />
    <Route path='/details' element={<ProductDetail />} />
    <Route path='/cart' element={<CartPage />} />
    <Route path='/revew' element={<Review />} />
    <Route path='/checkout' element={<Checkout />} />
    <Route path='/payement' element={<Payement />} />
    <Route path='/UserProf' element={<UserProfile />} />
    <Route path='/confirmation' element={<PaymentConfirmation />} />
  </>
));

const root = ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <CartProvider> {/* Wrap the application with CartProvider */}
          <RouterProvider router={routes} />
        </CartProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
