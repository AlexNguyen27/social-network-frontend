// import axios from "axios";
import logoutDispatch from "../../utils/logoutDispatch";
import { GET_ERRORS, CLEAR_ERRORS, AUTHENTICATE, BASE_URL } from "./types";
import { hera } from "hera-js";
// import jwt_decode from "jwt-decode";

import Swal from "sweetalert2";
import { getPosts } from "./post";
//LOGIN User
export const loginUser = ({ username, password }) => async (dispatch) => {
  // try {
  // const res = await axios.post('', data: {});
  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
    },
    query: `
        query {
          login(username: $username, password: $password) {
            id,
            token,
            username,
            firstName,
            lastName,
            email,
            phone,
            address,
            imageUrl,
            githubUsername,
            role,
            createdAt,
            updatedAt
          }
        }
      `,
    variables: {
      username,
      password,
    },
  });

  // console.log(data);
  // console.log("erer----------------", errors);

  if (errors) {
    // console.log("eror------------------", errors);
    // If login fails, set user info to null
    logoutDispatch(dispatch, errors);
    // if (errors.message === "Login fail") {
    //   errors.message = "Wrong username or password!";
    // } else if (
    //   errors.messageKey === "msg.pleaseEnterAllRequiredFields"
    // ) {
    //   errors.message = "This field is required!";
    // }

    const formatedErr = {};

    // Set errors
    dispatch({
      type: GET_ERRORS,
      errors: { message: errors[0].message },
    });
  } else {
    const resData = data.login;
    const { token } = resData;

    // const decoded = jwt_decode(token);

    const userData = { ...resData };
    delete userData.token;

    if (resData.role === "user") {
      userData.isUser = true;
    }
    if (resData.role === "admin") {
      userData.isAdmin = true;
    }

    dispatch({
      type: AUTHENTICATE,
      user: {
        userInfo: userData,
        isUser: userData.isUser || false,
        isAdmin: userData.isAdmin || false,
      },
      token,
    });

  }
};

//Logout User
export const logoutUser = () => (dispatch) => {
  // Set user info to null
  logoutDispatch(dispatch);
};

// Sign up User
export const signUpUser = (isAuthenticated, history, userData) => async (
  dispatch
) => {
  // await axios.post("api/auth/signup", userData, {
  //   headers: { Authorization: localStorage.token },
  // });

  const { username, password } = userData;
  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
    },
    query: `
        mutation {
          register(username: $username, password: $password, role: $role ) {
            id,
            username,
            password,
            phone,
            password,
            imageUrl,
            githubUsername,
            role,
            createdAt,
            updatedAt
          }
        }
      `,
    variables: {
      username,
      password,
      role: "user",
    },
  });

  console.log(data);
  if (errors) {
    // console.log('error---------', errors);
    // logoutUser(dispatch, errors);

    const formatedError = {};
    const error = errors[0].message;
    if (error.includes('Password')) {
      formatedError.password = error;
    }
    if (error.includes('Username')) {
      formatedError.username = error;
    }

    dispatch({
      type: GET_ERRORS,
      errors: {...formatedError},
    });
  } else {
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
  }
};
