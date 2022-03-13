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

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case FOLLOWING_USER_REQUEST:
    case UNFOLLOW_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FOLLOWING_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          following: [...state.user.following, action.payload],
        },
      };
    case UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          following: state.user.following.filter(
            (following) => following !== action.payload
          ),
        },
      };
    case FOLLOWING_USER_FAIL:
    case UNFOLLOW_USER_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export const profileReducer = (state = { profile: {} }, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
    case GET_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        profile: null,
      };
    case UPDATE_USER_SUCCESS:
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case UPDATE_USER_FAIL:
    case GET_USER_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FOLLOWING_USER_REQUEST:
    case UNFOLLOW_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FOLLOWING_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: {
          ...state.profile,
          following: [...state.profile.following, action.payload],
        },
      };
    case UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: {
          ...state.profile,
          following: state.profile.following.filter(
            (following) => following !== action.payload
          ),
        },
      };
    case FOLLOWING_USER_FAIL:
    case UNFOLLOW_USER_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const userSuggestionReducer = (state = {}, action) => {
  switch (action.type) {
    case SUGGESTION_USER_REQUEST:
      return {
        ...state,
        loading: true,
        suggestionUser: null,
      };
    case SUGGESTION_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        suggestionUser: action.payload,
      };
    case SUGGESTION_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
