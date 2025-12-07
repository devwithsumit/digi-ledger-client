import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '@/types/auth';

const getInitialState = (): AuthState => {
    const token = localStorage.getItem('dl_token');
    const userStr = localStorage.getItem('dl_user');
    const user = userStr ? JSON.parse(userStr) : null;

    return {
        user,
        token,
        isAuthenticated: !!token,
    };
};

const userSlice = createSlice({
    name: 'user',
    initialState: getInitialState(),
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('dl_token', action.payload.token);
            localStorage.setItem('dl_user', JSON.stringify(action.payload.user));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('dl_token');
            localStorage.removeItem('dl_user');
        },
    },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;

