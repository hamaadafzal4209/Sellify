import axios from "axios";
import {
  createProductFail,
  createProductRequest,
  createProductSuccess,
  getAllProductsFailed,
  getAllProductsRequest,
  getAllProductsSuccess,
} from "./productSlice";

export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch(createProductRequest());

    const { data } = await axios.post(
      `http://localhost:8000/api/product/create-product`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    dispatch(createProductSuccess(data.product));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch(createProductFail(errorMessage));
  }
};

// Action to get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch(getAllProductsRequest());
    const { data } = await axios.get(
      `http://localhost:8000/api/product/get-all-products`
    );
    // console.log("Fetched Products:", data.products);
    dispatch(getAllProductsSuccess(data.products));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch(getAllProductsFailed(errorMessage));
  }
};
