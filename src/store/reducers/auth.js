import {
  AUTHENTICATE,
  UNAUTHENTICATE,
  EDIT_USER_INFO,
  //   AUTHENTICATE_TEACHER,
} from "../actions/types";
import setAuthToken from "../../utils/setAuthToken";

const initialState = {
  isAuthenticated: false,
  isTeacher: false,
  isAdmin: false,
  token: null,
  user: {},
};

export default function (state = initialState, action) {
  const { type, user, token } = action;
  switch (type) {
    case AUTHENTICATE:
      //Set Token to Auth header
      setAuthToken(token);
      //Save Token to Local Storage
      localStorage.setItem("token", token);

      const { isAdmin = false, isTeacher = false, userInfo } = user;
      return {
        isAuthenticated: true,
        isTeacher,
        isAdmin,
        token,
        user: userInfo,
      };
    case EDIT_USER_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.userInfo,
        }
      };
    case UNAUTHENTICATE:
      // Remove Token in Auth header
      setAuthToken(false);

      // Remove token from local storage
      localStorage.removeItem("token");
      return initialState;
    default:
      return state;
  }
}
