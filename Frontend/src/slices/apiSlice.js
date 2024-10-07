import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { createApi } from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../Constants/constants';

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL});

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,// Adjust base URL as needed
    endpoints: (builder) => ({}), // Start with an empty object
});

export default apiSlice;

