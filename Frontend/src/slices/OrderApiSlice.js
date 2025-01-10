import { ORDERS_URL } from "../Constants/constants";
import apiSlice from "./apiSlice";

export const OrderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: `${ORDERS_URL}`,
                method: 'POST',
                body: order
            }),
        }),
        getAllOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}`,
                method: 'GET'
            }),
        }),
        getOrderById: builder.query({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`,
                method: 'GET'
            }),
        }),
        updateOrder: builder.mutation({
            query: (order) => ({
                url: `${ORDERS_URL}/${order.id}`,
                method: 'PUT',
                body: order
            }),
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`,
                method: 'DELETE'
            }),
        }),
    })
});

export const { useCreateOrderMutation, useGetAllOrdersQuery, useGetOrderByIdQuery, useUpdateOrderMutation, useDeleteOrderMutation } = OrderApiSlice;
