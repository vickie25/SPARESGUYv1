// slices for user registration using react redux toolkit

import { USERS_URL, PROFILE_URL } from "../Constants/constants.js"; // Ensure PROFILE_URL is defined
import apiSlice from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (user) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: user,
            }),
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: user,
            }),
        }),
        
        getUserProfile: builder.query({
            query: () => ({
                url: `${PROFILE_URL}`, // Ensure PROFILE_URL is correctly defined
                method: 'GET',
            }),
        }),

        updateUserProfile: builder.mutation({
            query: (user) => ({
                url: `${PROFILE_URL}`,
                method: 'PUT',
                body: user,
            }),
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
} = usersApiSlice;
