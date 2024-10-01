import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Features/product/productSlice";
import categoryReducer from "./Features/category/categorySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      product: productReducer,
      category: categoryReducer,
    },
  });
};
