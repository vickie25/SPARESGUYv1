import { BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Homepage from './Homepage/Homepage.jsx';
import Login from './Pages/login.jsx';
import Registration from './Pages/Registration.jsx';
import Shop from './Pages/shoppingPage.jsx';
import ProductDetail from './Pages/productDetail.jsx';
import PaymentConfirmation from './Pages/PaymentConfirmation.jsx';
import CartPage from './Pages/cartPage.jsx';
import Review from './Pages/Reviews.jsx';
import description from './Pages/description.jsx';
import ProductTabs from './Pages/ProductTabs.jsx';
import UserProfile from './Pages/UserProfile.jsx';
import ContactUs from './Pages/ContactUs.jsx';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './store.js';
import Checkout from './Pages/Checkout.jsx';
import Payement from './Pages/Payement.jsx'; // import PaymentConfirmation from './Pages/PaymentConfirmation.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { SearchProvider } from './context/SearchContext';
import AboutUs from './Pages/AboutUs.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';



// Admin Routes
import AdminLayout from './Admin/AdminLayout.jsx';
import AdminDashboard from './Admin/AdminDashboard.jsx';
import Inventory from './Admin/Inventory.jsx';
import Notifications from './Admin/Notifications.jsx';
import Customers from './Admin/Customer.jsx';
import Order from './Admin/Order.jsx';
import Categories from './Admin/Categories.jsx';
import Reports from './Admin/Reports.jsx';
import Logout from './Admin/Logout.jsx';
import Reviews from './Pages/Reviews.jsx';
import HeaderNotification from './Admin/Header/HeaderNotification.jsx'
import Settings from './Admin/Settings.jsx';
import Success from './Pages/Success.jsx';

const routes = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Homepage />} />
    <Route path="login" element={<Login />} />
    <Route path="registration" element={<Registration />} />
    <Route path="shop" element={<Shop />} />
    <Route path="product/:id" element={<ProductDetail />} />
    <Route path="product-tabs" element={<ProductTabs />} />
    <Route path="cart" element={<CartPage />} />
    <Route path='/success' element={<Success />} />


    <Route path="description" element={<description />} />
    <Route path="review" element={<Review />} /> 
    <Route path="checkout" element={<Checkout />} />
    <Route path="payment/:orderId" element={<Payement />} />
    <Route path="UserProf" element={<UserProfile />} />
    <Route path="confirmation" element={<PaymentConfirmation />} />
    <Route path="ContactUs" element={<ContactUs />} />
    <Route path="AboutUs" element={<AboutUs />} />


    /* Admin Routes */

    <Route path="admin" element={<AdminLayout />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="inventory" element={<Inventory />} />
      <Route path="customers" element={<Customers />} />
      <Route path="orders" element={<Order />} />
      <Route path="categories" element={<Categories />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="reports" element={<Reports />} />
      <Route path="header/notification" element={<HeaderNotification />} />
      <Route path="reviews" element={<Reviews />} />
      <Route path="settings" element={<Settings />} />
    </Route>
    <Route path="logout" element={<Logout />} />
  </Route>
));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <CartProvider>
          <SearchProvider>
            <RouterProvider router={routes} />
          </SearchProvider>
        </CartProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
