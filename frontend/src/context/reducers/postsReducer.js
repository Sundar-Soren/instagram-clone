import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_POSTS_FAIL,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
} from "../constants/postConstant";

export const postsReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
    case GET_POSTS_REQUEST:
      return {
        loading: true,
        success: false,
        posts: null,
      };
    case CREATE_POST_SUCCESS:
    case GET_POSTS_SUCCESS:
      return {
        loading: false,
        success: true,
        posts: action.payload,
      };
    case CREATE_POST_FAIL:
    case GET_POSTS_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
