import {
  ADD_COMMENT_FAIL,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  CLEAR_POST_SUCCESS_AND_ERROR,
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_FEED_POSTS_REQUEST,
  GET_FEED_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
} from "../constants/postConstant";

export const postsReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        isCreated: false,
      };
    case GET_POSTS_REQUEST:
      return {
        loading: true,
        success: false,
        posts: [],
      };
    case CREATE_POST_SUCCESS:
      return {
        loading: false,
        success: true,
        isCreated: true,
        posts: [...state.posts, action.payload],
      };
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
        isCreated: false,
        error: action.payload,
      };
    case CLEAR_POST_SUCCESS_AND_ERROR:
      return {
        ...state,
        isCreated: false,
      };
    default:
      return { ...state };
  }
};

export const feedPostsReducer = (state = { feedPosts: {} }, action) => {
  switch (action.type) {
    case GET_FEED_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        isFetch: false,
        feedPosts: [],
      };
    case GET_FEED_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        isFetch: true,
        feedPosts: action.payload,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        // feedPosts: {
        //   ...state.feedPosts,
        //   comments: [...state.user.comments, action.payload],
        // },
      };
    case ADD_COMMENT_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case GET_FEED_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        isFetch: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
