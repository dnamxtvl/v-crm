import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCookie } from 'cookies-next';

interface UserProfile {
    id: number,
    email: string,
    name: string,
    avatar: string | null
}

interface AuthState {
    token: string | null,
    isLogined: string | boolean,
    userProfile: UserProfile | null
}

const initialState: AuthState = {
    token: getCookie('token') ? getCookie('token') as string : null,
    isLogined: getCookie('isLogined') ? getCookie('isLogined') as unknown as boolean : false,
    userProfile: getCookie('userProfile') ? JSON.parse(getCookie('userProfile') as string) : null
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
            state.isLogined = true
        },
        clearToken(state) {
            state.token = null;
            state.isLogined = false;
            state.userProfile = null;
        },
        setProfile(state, action: PayloadAction<UserProfile>) {
            state.userProfile = action.payload
        }
    },
});

export const { setToken, clearToken, setProfile } = authSlice.actions;
export default authSlice.reducer;