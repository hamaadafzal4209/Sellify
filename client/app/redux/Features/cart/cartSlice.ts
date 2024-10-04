import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: Array.isArray(JSON.parse(localStorage.getItem("cartItems")))
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      console.log("Current cart:", state.cart);

      if (!Array.isArray(state.cart)) {
        console.error("Cart is not an array:", state.cart);
        state.cart = [];
      }

      const isItemExist = state.cart.find((i) => i._id === item._id);
      if (isItemExist) {
        state.cart = state.cart.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        state.cart.push(item);
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((i) => i._id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
