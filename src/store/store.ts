import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const dispatch = store.dispatch;