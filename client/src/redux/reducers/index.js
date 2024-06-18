import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import taskReducer from "./TaskReducer";
import FreelancerReducer from "./FreelancerReducer";
import clientReducer from "./clientReducer";
import ChatReducer from "./chatReducer";
import adminReducer from "./adminReducer";
const rootReducer = combineReducers({
  LoginReducer,
  taskReducer,
  FreelancerReducer,
  clientReducer,
  ChatReducer,
  adminReducer,
});

export default rootReducer;
