import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCategory: [],
  isLoading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    // get all categorys
    getAllCategorysRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getAllCategorysSuccess: (state, action) => {
      state.isLoading = false;
      state.allcategorys = action.payload;
    },
    getAllCategorysFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAllCategorysFailed,
  getAllCategorysRequest,
  getAllCategorysSuccess,
} = categorySlice.actions;

export default categorySlice.reducer;
