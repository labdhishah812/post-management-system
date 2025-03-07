import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import postsReducer from '../features/Auth/postSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer
  },
});