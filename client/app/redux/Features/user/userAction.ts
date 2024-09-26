// userActions.ts
import axios from "axios";
import {
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutUserSuccess,
} from "./userSlice";
import { server } from "@/server";

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch(loadUserSuccess(data.user)); // Save user data in Redux
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};

// logout user
export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get(`${server}/user/logout`, {
      withCredentials: true,
    });
    dispatch(logoutUserSuccess());
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};
