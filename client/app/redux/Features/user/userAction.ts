import axios from "axios";
import { loadUserFail, loadUserRequest, loadUserSuccess } from "./userSlice";
import { server } from "@/server";

// load user
export const loadUser = () => async (dispatch) => {
    try {
      dispatch(loadUserRequest());
      const { data } = await axios.get(`${server}/user/`, {
        withCredentials: true,
      });
      dispatch(loadUserSuccess(data.user));
    } catch (error:unknown) {
      dispatch(loadUserFail(error.response.data.message));
    }
  };