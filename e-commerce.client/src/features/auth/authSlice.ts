import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type User = {
    id: number | null;
    email: string | null;
    refreshToken: string | null;
}

type State = {
    user: User;
}

const state: State = {
    user: {
        id: null,
        email: null,
        refreshToken: null
    } 
}

const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: User }>) => {
            const { user } = action.payload;
            state.user = user       
        },
        logOut: (state) => {
            if (state.user) state.user.refreshToken = null
        }
    }
})


export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.user ? state.auth.user.refreshToken : null
export const selectCurrentUser = (state: RootState) => state.auth.user  

 
