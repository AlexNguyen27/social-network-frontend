import axios from "../utils/axios";
import logoutDispatch from "../utils/logoutDispatch";
import {
  GET_ERRORS
} from "./types";

//LOGIN User
export const loginUser = user => async dispatch => {
    console.log(user);
    dispatch({
      type: GET_ERRORS,
      errors: ["error message"]
    });
};
