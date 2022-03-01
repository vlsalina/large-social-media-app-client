import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { articlesReducer } from "./components/reducers/articlesReducer";
import { userReducer } from "./components/reducers/userReducer";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},
  articles: localStorage.getItem("articles")
    ? JSON.parse(localStorage.getItem("articles"))
    : [],
};

const reducer = combineReducers({
  user: userReducer,
  articles: articlesReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
