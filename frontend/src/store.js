import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { postsReducer } from "./context/reducers/postsReducer";
import { profileReducer, userReducer } from "./context/reducers/userReducers";

const reducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  profile: profileReducer,
});
const middleware = [thunk];
const initialState = {};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
