import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { articlesReducer } from "./components/reducers/articlesReducer";
import { userReducer } from "./components/reducers/userReducer";
import { authentication } from "./components/_reducers/authentication.reducer";
import rootReducer from "./components/_reducers/rootReducer";

//const initialState = {
//  articles: localStorage.getItem("articles")
//    ? JSON.parse(localStorage.getItem("articles"))
//    : [],
//};
//
//const reducer = combineReducers({
//  user: authentication,
//  articles: articlesReducer,
//});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  //initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
