import { configureStore } from '@reduxjs/toolkit';
import ContactUsSlice from '../Frontend/src/slices/ContactUsSlice';

const store = configureStore({
  reducer: {
    contact: ContactUsSlice,
  },
});

export default store;
