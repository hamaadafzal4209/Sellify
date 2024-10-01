import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  success: false,
  product: null,
  products: [],
  allProducts: [],
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    createProductRequest: (state) => {
      state.isLoading = true;
    },
    createProductSuccess: (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.product = action.payload;
    },
    createProductFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },

    // delete product of a shop
    deleteProductRequest: (state) => {
      state.isLoading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    deleteProductFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // get all products
    getAllProductsRequest: (state) => {
      state.isLoading = true;
    },
    getAllProductsSuccess: (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
    },
    getAllProductsFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    clearErrors: (state) => {
      state.error = null;
    },
    resetProductState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  createProductFail,
  createProductSuccess,
  createProductRequest,
  clearErrors,
  resetProductState,
  deleteProductFailed,
  deleteProductRequest,
  deleteProductSuccess,
  getAllProductsFailed,
  getAllProductsRequest,
  getAllProductsSuccess,
} = productSlice.actions;

export default productSlice.reducer;