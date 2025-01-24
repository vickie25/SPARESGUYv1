import { configureStore } from '@reduxjs/toolkit';
import { usersApiSlice } from './slices/usersApiSlice'
import { orderApiSlice } from './slices/orderApiSlice'; 

const store = configureStore({
  reducer: {
    // Add API reducers to the store
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    [orderApiSlice.reducerPath]: orderApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      usersApiSlice.middleware,
      orderApiSlice.middleware
    ), // Include RTK Query middleware
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export default store;
