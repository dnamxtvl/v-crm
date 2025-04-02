import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CookieManager from '@/utils/cookies';

interface UserProfile {
    id: number,
    email: string,
    userName: string,
    avatar: string | null
}

interface AuthState {
    token: string | null,
    isLogined: string | boolean,
    userProfile: UserProfile | null
}

const initialState: AuthState = {
    token: CookieManager.getCookie('token') ?? null,
    isLogined: CookieManager.getCookie('isLogined') ?? false,
    userProfile: CookieManager.getCookie('userProfile') ? JSON.parse(CookieManager.getCookie('userProfile') as string) : null
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