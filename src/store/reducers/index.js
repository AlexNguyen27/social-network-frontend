import { combineReducers } from "redux";
import errors from "./errors";
import auth from "./auth";
import user_profile from "./user_profile";
import course from "./course";
import question from "./question";
import lecture from "./lecture";
import user from "./user";
import post from "./post";
import category from "./category";

export default combineReducers({
  errors,
  auth,
  post,
  category,
  user,
  user_profile,
});
