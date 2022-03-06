import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { articlesReducer } from "./components/reducers/articlesReducer";
import { userReducer } from "./components/reducers/userReducer";
import { authentication } from "./components/_reducers/authentication.reducer";
import rootReducer from "./components/_reducers/rootReducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
