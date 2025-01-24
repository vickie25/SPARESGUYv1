
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


// import { configureStore } from '@reduxjs/toolkit';
// // Import your reducers
// import todosReducer from './reducers/todosReducer';
// import filtersReducer from './reducers/filtersReducer';

// // Configure store with your reducers
// const store = configureStore({
//     reducer: {
//         // Define a top-level state field named `todos`, handled by `todosReducer`
//         todos: todosReducer,
//         // Define a top-level state field named `filters`, handled by `filtersReducer`
//         filters: filtersReducer
//     }
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import { usersApiSlice } from './slices/usersApiSlice'; // Import your API slice

const store = configureStore({
  reducer: {
    // Add the RTK Query API reducer to your store under 'api'
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    // Other reducers can go here, for example:
    // todos: todosReducer,
    // filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApiSlice.middleware), // Include RTK Query middleware
});

export default store;

