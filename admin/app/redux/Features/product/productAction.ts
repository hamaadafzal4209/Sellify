import axios from "axios";
import {
  getAllProductsFailed,
  getAllProductsRequest,
  getAllProductsSuccess,
} from "./productSlice";

// Action to get all products
export const getAllProducts = () => async (dispatch) => {
    try {
      dispatch(getAllProductsRequest());
      const { data } = await axios.get(
        `http://localhost:8000/api/product/get-all-products`
      );
      console.log("Fetched Products:", data); 
      if (data.success && data.allProducts) {  // Ensure you're checking for success and the correct key
        dispatch(getAllProductsSuccess(data.allProducts));
      } else {
        dispatch(getAllProductsFailed("No products found."));
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      console.error("Error fetching products:", errorMessage);
      dispatch(getAllProductsFailed(errorMessage));
    }
  };
  
