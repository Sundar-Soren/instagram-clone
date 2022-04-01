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
  SINGLE_FEED_COMMENT_GET_FAIL,
  SINGLE_FEED_COMMENT_GET_REQUEST,
  SINGLE_FEED_COMMENT_GET_SUCCESS,
  SINGLE_POST_FAIL,
  SINGLE_POST_REQUEST,
  SINGLE_POST_SUCCESS,
  SP_COMMENT_ADD_FAIL,
  SP_COMMENT_ADD_REQUEST,
  SP_COMMENT_ADD_SUCCESS,
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

export const singlePostReducer = (state = { singlePost: {} }, action) => {
  switch (action.type) {
    case SINGLE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        isFetch: false,
        singlePost: [],
      };

    case SINGLE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        isFetch: true,
        singlePost: action.payload,
      };

    case SINGLE_POST_FAIL:
      return {
        ...state,
        loading: false,
        isFetch: false,
        error: action.payload,
      };

    case SP_COMMENT_ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SP_COMMENT_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        singlePost: {
          ...state.singlePost,
          comments: [...state.singlePost.comments, action.payload],
        },
      };
    case SP_COMMENT_ADD_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const feedPostCommentReducer = (
  state = { feedPostComment: {} },
  action
) => {
  switch (action.type) {
    case SINGLE_FEED_COMMENT_GET_REQUEST:
      return {
        ...state,
        loading: true,
        isFetch: false,
        feedPostComment: [],
      };

    case SINGLE_FEED_COMMENT_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        isFetch: true,
        feedPostComment: action.payload,
      };

    case SINGLE_FEED_COMMENT_GET_FAIL:
      return {
        ...state,
        loading: false,
        isFetch: false,
        error: action.payload,
      };

    // case SP_COMMENT_ADD_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // case SP_COMMENT_ADD_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     singlePost: {
    //       ...state.singlePost,
    //       comments: [...state.singlePost.comments, action.payload],
    //     },
    //   };
    // case SP_COMMENT_ADD_FAIL:
    //   return {
    //     ...state,
    //     loading: false,
    //   };
    default:
      return state;
  }
};
