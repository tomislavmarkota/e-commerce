import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type Roles = "ADMIN" | "EDITOR" | "USER";

export type User = {
    id: number | null;
    email: string | null;
    refreshToken: string | null;
    roles: Roles[];
}

type State = {
    user: User;
}

const state: State = {
    user: {
        id: null,
        email: null,
        refreshToken: null,
        roles: []
    } 
}

const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: User }>) => {
            const { user } = action.payload; 
            console.log("setCredentials trigrered")
            console.log("user iz STATEA:", state.user);
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

 
