import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    signupStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.error = null;
    },
    signupFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
} = authSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await api.post('/users/login', {
      email: credentials.email,
      password: credentials.password
    });
    localStorage.setItem('token', response.data.token);
    
    dispatch(loginSuccess(response.data));
  } catch (error) {
    const errorMsg = error.response?.data?.message || 'Login failed. Please try again.';
    dispatch(loginFailure(errorMsg));
  }
};

export const signupUser = (userData) => async (dispatch) => {
  try {
    dispatch(signupStart());
    const response = await api.post('/users/register', {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      phone_number: userData.phone_number,
      address: userData.address || ""
    });
    
    dispatch(signupSuccess(response.data));
    if (response.data.user) {
      dispatch(loginUser({ 
        email: userData.email, 
        password: userData.password 
      }));
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message || 'Registration failed. Please try again.';
    dispatch(signupFailure(errorMsg));
  }
};
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logout());
};

export { api };
export default authSlice.reducer;