import { combineReducers } from "redux";
import { userReducer } from "./user.reducer";
import { alert } from "./alert.reducer";
import { articlesReducer } from "./articles.reducer";

const rootReducer = combineReducers({
  alert: alert,
  user: userReducer,
  articles: articlesReducer,
});

export default rootReducer;
