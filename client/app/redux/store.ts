import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'; // Adjust the path

// Create and configure the store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Default export the store
export default store;   
