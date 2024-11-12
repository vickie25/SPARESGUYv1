import  apiSlice  from './apiSlice'; // Assuming apiSlice is already defined
import { createSlice } from '@reduxjs/toolkit';

const CheckoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the 'createOrder' mutation
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: 'http://localhost:8000/api/order', // Make sure this is the correct endpoint for your backend
        method: 'POST',
        body: orderData, // Send the orderData as the body
      }),
      // Optional: Customize the response, such as mapping or error handling
      transformResponse: (response) => response, // This can be adjusted based on your server's response structure
      // Optional: Handles any side effects or updates to the store
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled; // Wait for the query to finish
        } catch (error) {
          console.error('Error creating order:', error);
        }
      },
    }),

    // If you want to fetch order details, you can define another endpoint here
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `/orders/${orderId}`, // Endpoint to get the order details
        method: 'GET',
      }),
      transformResponse: (response) => response, // Customize this as needed
    }),
  }),
  // Keep this line for injecting into your apiSlice
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } = CheckoutApiSlice;

export default CheckoutApiSlice;
