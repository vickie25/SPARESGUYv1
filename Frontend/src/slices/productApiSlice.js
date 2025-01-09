import { PRODUCTS_URL } from "../Constants/constants.js";
import apiSlice from "./apiSlice";

export const ProductsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        createProduct: builder.mutation({
            query:(product) =>({
                url: `${PRODUCTS_URL}`,
                method: 'POST',
                body: product
            }),
        }),
        getProducts: builder.query({
            query: () =>({
                url: `${PRODUCTS_URL}`,
                method: 'GET'
            }),
        }),
        getProductById: builder.query({
            query: (id) =>({
                url: `${PRODUCTS_URL}/${id}`,
                method: 'GET'
            }),
        }),
        updateProduct: builder.mutation({
            query: (product) =>({
                url: `${PRODUCTS_URL}/${product.id}`,
                method: 'PUT',
                body: product
            }),
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
                method: 'DELETE',
            }),
        }),

    })
})

export const {
    useCreateProductMutation,
    useGetProductsQuery,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useDeleteProductMutation} = ProductsApiSlice;