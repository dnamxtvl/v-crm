import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCookie } from 'cookies-next';
import { defaultLocale } from '../../../i18n.config';

interface UserProfile {
    id: string,
    email: string,
    name: string,
    avatar: string | null
}

interface AuthState {
    token: string | null,
    isLogined: string | boolean,
    userProfile: UserProfile | null,
    lang: string
}

const initialState: AuthState = {
    token: getCookie('token') ? getCookie('token') as string : null,
    isLogined: getCookie('isLogined') ? getCookie('isLogined') as unknown as boolean : false,
    userProfile: getCookie('userProfile') ? JSON.parse(getCookie('userProfile') as string) : null,
    lang: getCookie('lang') ? getCookie('lang') as string : defaultLocale,
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setToken(state: any, action: PayloadAction<string>) {
            state.token = action.payload;
            state.isLogined = true
        },
        clearToken(state: any) {
            state.token = null;
            state.isLogined = false;
            state.userProfile = null;
        },
        setProfile(state: any, action: PayloadAction<UserProfile>) {
            state.userProfile = action.payload
        },
        setLang(state: any, action: PayloadAction<string>) {
            state.lang = action.payload
        }
    },
});

export const { setToken, clearToken, setProfile, setLang } = authSlice.actions;
export default authSlice.reducer;