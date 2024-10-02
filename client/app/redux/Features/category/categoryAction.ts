import axios from "axios";
import {
  getAllCategoriesRequest,
  getAllCategoriesSuccess,
  getAllCategoriesFailed,
} from "./categorySlice";

// Fetch all categories
export const fetchAllCategories = () => async (dispatch) => {
  try {
    dispatch(getAllCategoriesRequest());
    const { data } = await axios.get("http://localhost:8000/api/category/get-all-categories");
    console.log("Fetched categories:", data.categories);
    dispatch(getAllCategoriesSuccess(data.categories));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Error fetching categories";
    dispatch(getAllCategoriesFailed(errorMessage));
  }
};