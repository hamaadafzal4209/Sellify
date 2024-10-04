import { addToCart, clearCart, removeFromCart } from "./cartSlice";

// Add to cart action
export const addTocartAction = (data) => (dispatch, getState) => {
  if (data && data._id) {
    dispatch(addToCart(data));
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  } else {
    console.error('Invalid product data:', data);
  }
};

// Remove from cart action
export const removeFromCartAction = (id) => (dispatch, getState) => {
  dispatch(removeFromCart(id));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
};

// Clear cart action
export const clearCartAction = () => (dispatch) => {
  dispatch(clearCart());
  localStorage.setItem("cartItems", JSON.stringify([]));
};