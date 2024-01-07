import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type State = {
    token: string | null;
}

const state: State = {
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
            const { accessToken } = action.payload;
            state.token = accessToken;
        },
        logOut: (state) => {
            state.token = null
        }
    }
})


export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;