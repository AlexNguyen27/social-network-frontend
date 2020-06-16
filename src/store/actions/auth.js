import axios from "../../utils/axios";
import logoutDispatch from "../../utils/logoutDispatch";
import { GET_ERRORS, CLEAR_ERRORS, AUTHENTICATE } from "./types";

import jwt_decode from "jwt-decode";

import Swal from "sweetalert2";
//LOGIN User
export const loginUser = (user) => async (dispatch) => {
  // user includes username, password
  try {
    const res = await axios.post("/api/auth/signin", user);
    // const { token } = res.data.data;

    const resData = res.data.data;
    const { token } = resData;

    // Decode Token
    const decoded = jwt_decode(token.replace("Bearer ", ""));
    console.log("decoded -------", decoded);

    const userData = {};
    if (resData.role.authority === "ROLE_ADMIN") {
      userData.isAdmin = true;
    }
    if (resData.role.authority === "ROLE_TEACHER") {
      userData.isTeacher = true;
    }

    userData.userInfo = {
      id: resData.id,
      email: resData.email,
      fullname: resData.fullname,
      username: resData.username,
    };

    console.log(resData);
    //Retrieve User info from decoded token
    dispatch({
      type: AUTHENTICATE,
      user: userData,
      token,
    });

    //Clear errors
    dispatch({
      type: CLEAR_ERRORS,
    });
  } catch (error) {
    // If login fails, set user info to null
    console.log("err----------------", error);
    logoutDispatch(dispatch, error);
    if (error.response.data.message === "Login fail") {
      error.response.data.message = "Wrong username or password!";
    }
    // Set errors
    dispatch({
      type: GET_ERRORS,
      errors: error.response.data,
    });
  }
};

//Logout User
export const logoutUser = () => (dispatch) => {
  // Set user info to null
  console.log("here");

  logoutDispatch(dispatch);
};

// Sign up User
export const signupTeacher = (isAuthenticated, history, userData) => async (
  dispatch
) => {
  try {
    userData.role = ["TEACHER"];

    await axios.post("api/auth/signup", userData, {
      headers: { Authorization: localStorage.token },
    });

    dispatch({
      type: CLEAR_ERRORS,
    });
    // using sweetalert2
    Swal.fire({
      position: "center",
      type: "success",
      title: "Login to continue",
      showConfirmButton: false,
      timer: 1500,
    });

    if (!isAuthenticated) {
      history.push("/login");
    }

    // When admin create teacher
    // history.push('/teacherList');
  } catch (error) {
    logoutUser(dispatch, error);
    dispatch({
      type: GET_ERRORS,
      errors: error.response.data,
    });
  }
};
