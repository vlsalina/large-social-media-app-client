import { combineReducers } from "redux";
import { authentication } from "./authentication.reducer";
import { alert } from "./alert.reducer";
import { articlesReducer } from "../reducers/articlesReducer";

const rootReducer = combineReducers({
  alert: alert,
  user: authentication,
  articles: articlesReducer,
});

export default rootReducer;
