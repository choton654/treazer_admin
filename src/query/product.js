// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import BASE_URL from '../utils/api'

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/product` }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        deleteProduct: builder.mutation({
            query: ({ productId, storeid }) => ({
                url: `${productId}/deleteproduct`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, { storeid }) => {
                console.log(result, error, storeid);
                return [{ type: 'Store', id: storeid }]
            }
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useDeleteProductMutation } = productApi