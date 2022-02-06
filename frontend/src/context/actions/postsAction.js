import axios from "axios";
import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_FEED_POSTS_FAIL,
  GET_FEED_POSTS_REQUEST,
  GET_FEED_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
} from "../constants/postConstant";

export const createPosts = (postData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_POST_REQUEST });
    const res = await axios.post("/post/create", postData);
    dispatch({ type: CREATE_POST_SUCCESS, payload: res.data.post });
  } catch (error) {
    dispatch({ type: CREATE_POST_FAIL, payload: error.response.data.error });
  }
};

export const getOtherPosts = (id) => async (dispatch) => {
  dispatch({ type: GET_POSTS_REQUEST });
  try {
    const res = await axios.get(`/post/others/${id}`);
    dispatch({ type: GET_POSTS_SUCCESS, payload: res.data.posts });
  } catch (error) {
    dispatch({ type: GET_POSTS_FAIL, payload: error.response.data.error });
  }
};

export const getFeedPostsApiCall = () => async (dispatch) => {
  dispatch({ type: GET_FEED_POSTS_REQUEST });
  try {
    const res = await axios.post("/feedPosts");
    dispatch({ type: GET_FEED_POSTS_SUCCESS, payload: res.data.feedPosts });
  } catch (error) {
    dispatch({ type: GET_FEED_POSTS_FAIL, payload: error.response.data.error });
  }
};
