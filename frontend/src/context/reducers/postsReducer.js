import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
} from "../constants/postConstant";

export const postsReducer = (state = { posts: {} }, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return {
        loading: true,
        success: false,
        posts: null,
      };
    case CREATE_POST_SUCCESS:
      return {
        loading: false,
        success: true,
        posts: action.payload,
      };
    case CREATE_POST_FAIL:
      return {
        loading: false,
        success: false,
        posts: action.payload,
      };
    default:
      return state;
  }
};
