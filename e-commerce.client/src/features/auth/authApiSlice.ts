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
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/Auth/refresh',
                method: 'GET'
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                    
                } catch (err) {
                    console.log(err)
                }
            }
        })
    })
})


export const {
    useLoginMutation,
    useLazyUsersQuery,
    useRefreshMutation
} = authApiSlice