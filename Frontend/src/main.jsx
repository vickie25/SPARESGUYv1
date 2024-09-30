import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Homepage from './Homepage/Homepage.jsx'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';
import {Provider} from 'react-redux';
import store from './store.js'


const routes = createBrowserRouter( createRoutesFromElements(
  <>
  <Route path="/app" element={<App />} />
  <Route index={true} path='/' element={<Homepage />}/>
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