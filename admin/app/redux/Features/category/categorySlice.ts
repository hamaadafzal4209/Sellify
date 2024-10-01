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
    createCategorySuccess: (state, action) => {
      state.allCategories.push(action.payload);
    },
    updateCategorySuccess: (state, action) => {
      const index = state.allCategories.findIndex(
        (category) => category._id === action.payload._id
      );
      if (index !== -1) {
        state.allCategories[index] = action.payload;
      }
    },
    deleteCategorySuccess: (state, action) => {
      state.allCategories = state.allCategories.filter(
        (category) => category._id !== action.payload
      );
    },
  },
});

export const {
  getAllCategoriesRequest,
  getAllCategoriesSuccess,
  getAllCategoriesFailed,
  createCategorySuccess,
  updateCategorySuccess,
  deleteCategorySuccess,
} = categorySlice.actions;

export default categorySlice.reducer;