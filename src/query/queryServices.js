// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import BASE_URL from '../utils/api'

// Define a service using a base URL and expected endpoints
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api` }),
    tagTypes: ['Store', 'Order'],
    endpoints: (builder) => ({
        getAllResturant: builder.query({
            query: () => `resturant/getAllResturant`,
            providesTags: (result) =>  // is result available?
                result
                    ? // successful query
                    [
                        ...result.resturants.map(({ _id }) => ({ type: 'Store', id: _id })),
                        { type: 'Store', id: 'LIST' },
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    [{ type: 'Store', id: 'LIST' }],
        }),
        getSingleResturant: builder.query({
            query: (id) => `resturant/${id}/getOneResturant`,
            providesTags: (result) =>
                [{ type: 'Store', id: result.resturant._id }]
        }),
        verifyRestaurant: builder.mutation({
            query: (id) => ({
                url: `resturant/${id}/verify`,
                method: 'POST'
            }),
            invalidatesTags: (result, error, id) =>
                [{ type: 'Store', id }]
        }),
        openRestaurant: builder.mutation({
            query: () => ({
                url: `resturant/openAllRestaurant`,
                method: 'PUT'
            }),
            invalidatesTags: (result, error, id) =>
                [{ type: 'Store' }]
        }),
        closeRestaurant: builder.mutation({
            query: () => ({
                url: `resturant/closeAllRestaurant`,
                method: 'PUT'
            }),
            invalidatesTags: (result, error, id) =>
                [{ type: 'Store' }]
        }),
        getAllOrder: builder.query({
            query: () => `order/adminallorder`,
            providesTags: (result) =>  // is result available?
                result
                    ? // successful query
                    [
                        ...result.order.map(({ _id }) => ({ type: 'Order', id: _id })),
                        { type: 'Order', id: 'LIST' },
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    [{ type: 'Order', id: 'LIST' }],
        }),
        verifyOrder: builder.mutation({
            query: (orderId) => ({
                url: 'order/adminverifyorder',
                method: "POST",
                body: { orderId }
            }),
            invalidatesTags: (result, error, orderId) =>
                [{ type: 'Order', id: orderId }]
        }),
        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: `product/${id}/deleteproduct`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, { storeid }) =>
                [{ type: 'Store', id: storeid }]
        })
    }),
})

export const { useGetAllResturantQuery, useVerifyRestaurantMutation,
    useGetSingleResturantQuery, useDeleteProductMutation,
    useGetAllOrderQuery, useVerifyOrderMutation,
    useOpenRestaurantMutation, useCloseRestaurantMutation } = api
