import axios from "axios";
import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
} from "../constants/postConstant";
import { loadUser } from "./userActions";

export const createPosts = (postData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_POST_REQUEST });
    const res = await axios.post("/post/create", postData);
    dispatch({ type: CREATE_POST_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (error) {
    dispatch({ type: CREATE_POST_FAIL, payload: error.response.data.error });
  }
};
