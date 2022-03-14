import { combineReducers } from "redux";
import { userReducer } from "./user.reducer";
import { alert } from "./alert.reducer";
import { articlesReducer } from "./articles.reducer";

const rootReducer = combineReducers({
  alert: alert,
  user: userReducer,
  data: articlesReducer,
});

export default rootReducer;
