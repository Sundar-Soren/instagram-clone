import axios from "axios";
import {
  FOLLOWING_USER_FAIL,
  FOLLOWING_USER_REQUEST,
  FOLLOWING_USER_SUCCESS,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  SUGGESTION_USER_FAIL,
  SUGGESTION_USER_REQUEST,
  SUGGESTION_USER_SUCCESS,
  UNFOLLOW_USER_FAIL,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "../constants/userConstants";
import { getOtherPosts } from "./postsAction";
//user login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { Headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/login", { email, password }, config);
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.error });
  }
};

// register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { Headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post("/signup", userData, config);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.error });
  }
};

//Load User me
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get("/me");
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.error });
  }
};
//LOGOUT User
export const logout = () => async (dispatch) => {
  try {
    await axios.get("/logout");
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: "Failed to Logout" });
  }
};

//UPDATE-USER
export const updateUser = (updateData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    const res = await axios.put("/user/update", updateData);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.error });
  }
};

//USER SUGGESTION
export const getUserSuggestion = () => async (dispatch) => {
  dispatch({ type: SUGGESTION_USER_REQUEST });
  try {
    const res = await axios.get("/user_suggestion");
    dispatch({
      type: SUGGESTION_USER_SUCCESS,
      payload: res.data.getRandomUser,
    });
  } catch (error) {
    dispatch({
      type: SUGGESTION_USER_FAIL,
      payload: error.response.data.error,
    });
  }
};

//FOLLOWING USERS

export const followingUserCall = (followingID) => async (dispatch) => {
  dispatch({ type: FOLLOWING_USER_REQUEST });
  try {
    const res = await axios.put("/user/following", {
      following: followingID,
    });
    dispatch({
      type: FOLLOWING_USER_SUCCESS,
      payload: res.data.followingId,
    });
  } catch (error) {
    dispatch({
      type: FOLLOWING_USER_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const unfollowingUserCall = (unfollowingID) => async (dispatch) => {
  dispatch({ type: UNFOLLOW_USER_REQUEST });
  try {
    const res = await axios.put("/user/unfollowing", {
      unfollowing: unfollowingID,
    });
    dispatch({ type: UNFOLLOW_USER_SUCCESS, payload: res.data.unfollowingId });
  } catch (error) {
    dispatch({
      type: UNFOLLOW_USER_FAIL,
      payload: error.response.data.error,
    });
  }
};

//GET USER PROFILE

export const getUserProfile = (username) => async (dispatch) => {
  dispatch({ type: GET_USER_PROFILE_REQUEST });
  try {
    const res = await axios.get(`/user/profile/${username}`);
    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: res.data.profile });
    dispatch(getOtherPosts(res.data.profile._id));
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_FAIL,
      payload: error.response.data.error,
    });
  }
};
