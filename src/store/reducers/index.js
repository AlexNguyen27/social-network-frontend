import { combineReducers } from "redux";
import errors from "./errors";
import auth from "./auth";
import course from "./course";
import question from "./question";
import lecture from "./lecture";

export default combineReducers({
  auth,
  course,
  question,
  lecture,
  errors,
});
