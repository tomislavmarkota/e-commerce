import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { logOut } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:7045/api',
    credentials: 'include',
    prepareHeaders: (headers) => {
        //const token = (getState() as RootState).auth.user?.refreshToken
        const token = localStorage.getItem('refresh');
        if (token) {
            headers.set('Authorization', `${token}`);
        }
        return headers;
    }
})

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        console.log('sending refresh token');
        // send refresh token to get new acces token
        const refreshResult = await baseQuery('Auth/refresh', api, extraOptions);

        console.log("refreshResult",refreshResult);

        if (refreshResult?.data) {
            console.log("refreshResult.data", refreshResult.data);
        } else {
            api.dispatch(logOut())
        }
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({})
})