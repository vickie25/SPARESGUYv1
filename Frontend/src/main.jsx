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
import PaymentConfirmation from './Pages/PaymentConfirmation.jsx';
import CartPage from './Pages/cartPage.jsx';
import Review from './Pages/Reviews.jsx';
import UserProfile from './Pages/UserProfile.jsx';
import ContactUs from './Pages/ContactUs.jsx';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './store.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkout from './Pages/Checkout.jsx';
import Payement from './Pages/Payement.jsx';// import PaymentConfirmation from './Pages/PaymentConfirmation.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { SearchProvider } from './context/SearchContext';
// import AboutUs from './Pages/AboutUsPages/AboutUs.jsx';

const routes = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Homepage />} />
    <Route path="login" element={<Login />} />
    <Route path="registration" element={<Registration />} />
    <Route path="shop" element={<Shop />} />
    <Route path="product/:id" element={<ProductDetail />} />
    <Route path="cart" element={<CartPage />} />
    <Route path="revew" element={<Review />} />
    <Route path="checkout" element={<Checkout />} />
    <Route path="payment/:orderId" element={<Payement />} />
    <Route path="UserProf" element={<UserProfile />} />
    <Route path="confirmation" element={<PaymentConfirmation />} />
    <Route path="confirmation" element={<PaymentConfirmation />} />

    <Route path="confirmation" element={<PaymentConfirmation />} />
    <Route path="confirmation" element={<PaymentConfirmation />} />


    {/* <Route path="confirmation" element={<PaymentConfirmation />} />
    <Route path="confirmation" element={<PaymentConfirmation />} /> */}

    <Route path="ContactUs" element={<ContactUs />} />
    <Route path="AboutUs" element={<AboutUs />} /> 

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
