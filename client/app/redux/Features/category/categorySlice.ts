// redux/categorySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCategories: [],
  isLoading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getAllCategoriesRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getAllCategoriesSuccess: (state, action) => {
      state.isLoading = false;
      state.allCategories = action.payload;
    },
    getAllCategoriesFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAllCategoriesRequest,
  getAllCategoriesSuccess,
  getAllCategoriesFailed,
} = categorySlice.actions;

export default categorySlice.reducer;