import { combineReducers } from "redux";
import { authentication } from "./authentication.reducer";
import { articlesReducer } from "../reducers/articlesReducer";

const rootReducer = combineReducers({
  user: authentication,
  articles: articlesReducer,
});

export default rootReducer;
