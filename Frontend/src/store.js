// store.js
import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({
    reducer: {
        // Define a top-level state field named `todos`, handled by `todosReducer`
       
        // Define a top-level state field named `filters`, handled by `filtersReducer`
       
    }
});

export default store;