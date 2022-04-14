// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import BASE_URL from '../utils/api'

// Define a service using a base URL and expected endpoints
export const storeApi = createApi({
    reducerPath: 'storeApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/resturant` }),
    tagTypes: ['Store'],
    endpoints: (builder) => ({
        getAllResturant: builder.query({
            query: () => `getAllResturant`,
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
            query: (id) => `${id}/getOneResturant`,
            providesTags: (result) =>
                [{ type: 'Store', id: result._id }],
        }),
        verifyRestaurant: builder.mutation({
            query: (id) => ({
                url: `${id}/verify`,
                method: 'POST'
            }),
            invalidatesTags: (result, error, id) =>
                [{ type: 'Store', id }]
        }),
    }),
})

export const { useGetAllResturantQuery, useVerifyRestaurantMutation,
    useGetSingleResturantQuery } = storeApi
