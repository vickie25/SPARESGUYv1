import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Homepage from './Homepage/Homepage.jsx'
import Login from './Pages/login.jsx'
import Registration from './Pages/Registration.jsx'
import Shop from './Pages/shoppingPage.jsx'
import ProductDetail from './Pages/productDetail.jsx';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';
import {Provider} from 'react-redux';
import store from './store.js'


const routes = createBrowserRouter( createRoutesFromElements(
  <>
  <Route path="/app" element={<App />} />
  <Route index={true} path='/' element={<Homepage />}/>
  <Route path='/login' element={<Login />}/>
  <Route path='/registration' element={<Registration />}/>
  <Route path='/shop' element={<Shop />}/>
  <Route path='/prd' element={<ProductDetail />} />
  </>
 
))


const root = ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <HelmetProvider>
    <Provider store={store}>
    <RouterProvider router={routes}/>
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
  
)