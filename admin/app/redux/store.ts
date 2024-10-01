import { configureStore } from '@reduxjs/toolkit'
import productReducer from './Features/product/productSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      product: productReducer,
    },
  })
}