import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // get all products
    getAllProductsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getAllProductsSuccess: (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
    },
    getAllProductsFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAllProductsFailed,
  getAllProductsRequest,
  getAllProductsSuccess,
} = productSlice.actions;

export default productSlice.reducer;
