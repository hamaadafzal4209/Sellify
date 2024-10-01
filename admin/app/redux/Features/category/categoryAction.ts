// redux/categoryActions.js
import axios from "axios";
import {
  getAllCategoriesRequest,
  getAllCategoriesSuccess,
  getAllCategoriesFailed,
  createCategorySuccess,
  updateCategorySuccess,
  deleteCategorySuccess,
} from "./categorySlice";

// Fetch all categories
export const fetchAllCategories = () => async (dispatch) => {
  try {
    dispatch(getAllCategoriesRequest());
    const { data } = await axios.get("http://localhost:8000/api/category/get-all-categories");
    dispatch(getAllCategoriesSuccess(data.categories));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Error fetching categories";
    dispatch(getAllCategoriesFailed(errorMessage));
  }
};

// Create category
export const createCategory = (name, imageBase64) => async (dispatch) => {
  try {
    const { data } = await axios.post("http://localhost:8000/api/category/create-category", {
      name,
      imageBase64,
    });
    dispatch(createCategorySuccess(data.category));
  } catch (error) {
    console.error("Error creating category:", error);
  }
};

// Update category
export const updateCategory = (id, name, imageBase64) => async (dispatch) => {
  try {
    const { data } = await axios.put(`http://localhost:8000/api/category/update-category/${id}`, {
      name,
      imageBase64,
    });
    dispatch(updateCategorySuccess(data.category));
  } catch (error) {
    console.error("Error updating category:", error);
  }
};

// Delete category
export const deleteCategory = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8000/api/category/delete-category/${id}`);
    dispatch(deleteCategorySuccess(id));
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};