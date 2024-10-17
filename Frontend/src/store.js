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