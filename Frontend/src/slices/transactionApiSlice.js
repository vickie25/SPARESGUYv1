import { TRANSACTION_URL, PAYPAL_URL, ONLINE_URL } from "../Constants/constants";
import apiSlice from "./apiSlice";

export const transactionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTransactions: builder.query({
            query: () => ({
                url: `${TRANSACTION_URL}`,
                method: 'GET'
            }),
            providesTags: ['Transactions']
        }),
        getTransaction: builder.query({
            query: (id) => ({
                url: `${TRANSACTION_URL}/${id}`,
                method: 'GET'
            }),
            providesTags: (result, error, id) => [{ type: 'Transaction', id }]
        }),
        createTransaction: builder.mutation({
            query: (transaction) => ({
                url: `${TRANSACTION_URL}/register`,
                method: 'POST',
                body: transaction
            }),
            invalidatesTags: ['Transactions'],
            onQueryStarted: async (transaction, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch {
                    // Optional error handling if needed
                }
            }
        }),
        manyTransaction: builder.mutation({
            query: (transactions) => ({
                url: `${TRANSACTION_URL}/registerMany`,
                method: 'POST',
                body: transactions
            }),
            invalidatesTags: ['Transactions']
        }),
        updateTransaction: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${TRANSACTION_URL}/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Transaction', id }],
            onQueryStarted: async ({ id, ...data }, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch {
                    // Optional rollback logic here
                }
            }
        }),
        deleteTransaction: builder.mutation({
            query: (id) => ({
                url: `${TRANSACTION_URL}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Transaction', id }],
            onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch {
                    // Optional error handling if needed
                }
            }
        }),
        sendLateReminders: builder.mutation({
            query: (id) => ({
                url: `${TRANSACTION_URL}/reminder/${id}`,
                method: 'POST'
            }),
            invalidatesTags: ['Transactions']
        }),
        getPaypalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL,
                method: 'GET'
            }),
            keepUnusedDataFor: 5
        }),
        getAllOnlineTransactions: builder.query({
            query: () => ({
                url: ONLINE_URL,
                method: 'GET'
            }),
            providesTags: ['OnlineTransactions']
        })
    })
});

export const {
    useGetTransactionsQuery,
    useGetTransactionQuery,
    useCreateTransactionMutation,
    useManyTransactionMutation,
    useUpdateTransactionMutation,
    useDeleteTransactionMutation,
    useSendLateRemindersMutation,
    useGetPaypalClientIdQuery,
    useGetAllOnlineTransactionsQuery
} = transactionApiSlice;
