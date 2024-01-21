/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './api/apiSlice';

import authReducer from "../features/auth/authSlice";



export const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware): any => getDefaultMiddleware().concat(apiSlice.middleware),  
    // remove devtools in production !!!!
    devTools: true

})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch