import { apiSlice } from '../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/Auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        users: builder.query({
            query: () => ({ url: '/Auth/users', credentials: 'include' })
        })
    })
})


export const {
    useLoginMutation,
    useLazyUsersQuery
} = authApiSlice