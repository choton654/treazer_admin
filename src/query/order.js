// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import BASE_URL from '../utils/api'

// Define a service using a base URL and expected endpoints
export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/order` }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        getAllOrder: builder.query({
            query: () => `adminallorder`,
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
                url: 'adminverifyorder',
                method: "POST",
                body: { orderId }
            }),
            invalidatesTags: (result, error, orderId) =>
                [{ type: 'Order', id: orderId }]
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllOrderQuery, useVerifyOrderMutation } = orderApi