/* eslint-disable @typescript-eslint/no-explicit-any */
"use cient"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  user: any;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  message: null,
};

// Register User
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/registration', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Activate User
export const activateUser = createAsyncThunk(
  'auth/activateUser',
  async (activationData: { activation_token: string; activation_code: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/activate-user', activationData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/login', loginData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/logout');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });

    // Activate User
    builder.addCase(activateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(activateUser.fulfilled, (state) => {
      state.loading = false;
      state.message = 'User activated successfully';
    });
    builder.addCase(activateUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });

    // Login User
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });

    // Logout User
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    });
    builder.addCase(logoutUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });
  },
});

export const { resetMessage, resetError } = authSlice.actions;
export default authSlice.reducer;
