/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
    "auth/registerUser",
    async (
      userData: { name: string; email: string; password: string },
      { rejectWithValue }
    ) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/user/registration",
          userData
        );
        
        // Return the response with the token
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );  

// Verify OTP
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (
    otpData: { activation_token: string; activation_code: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/activate-user",
        otpData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    loginData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        loginData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
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

    // Verify OTP
    builder.addCase(verifyOTP.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifyOTP.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
    });
    builder.addCase(verifyOTP.rejected, (state, { payload }) => {
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
  },
});

export const { resetMessage, resetError } = authSlice.actions;
export default authSlice.reducer;
