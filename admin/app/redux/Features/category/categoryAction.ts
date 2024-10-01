import axios from "axios";
import { getAllCategorysFailed, getAllCategorysRequest, getAllCategorysSuccess } from "./categorySlice";

// Action to get all products
export const getAllProducts = () => async (dispatch) => {
    try {
      dispatch(getAllCategorysRequest());
      const { data } = await axios.get(
        `http://localhost:8000/api/category/get-all-categories`
      );
      console.log("Fetched Products:", data); 
      if (data.success && data.allProducts) { 
        dispatch(getAllCategorysSuccess(data.allProducts));
      } else {
        dispatch(getAllCategorysFailed("No products found."));
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      console.error("Error fetching products:", errorMessage);
      dispatch(getAllCategorysFailed(errorMessage));
    }
  };
  
