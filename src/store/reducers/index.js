import { combineReducers } from "redux";
import errors from "./errors";
import auth from "./auth";
import course from "./course";
import question from "./question";
import lecture from "./lecture";
import user from './user';

export default combineReducers({
  auth,
  user,
  course,
  question,
  lecture,
  errors,
  
});
