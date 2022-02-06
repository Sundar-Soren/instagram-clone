import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  feedPostsReducer,
  postsReducer,
} from "./context/reducers/postsReducer";
import {
  profileReducer,
  userReducer,
  userSuggestionReducer,
} from "./context/reducers/userReducers";

const reducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  profile: profileReducer,
  userSuggestion: userSuggestionReducer,
  feedPosts: feedPostsReducer,
});
const middleware = [thunk];
const initialState = {};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
