import axios from "../../utils/axios";
import { GET_ERRORS, CLEAR_ERRORS } from "./types";
import { logoutUser } from "./auth";
import Swal from "sweetalert2";

export const updatePassword = (setLoading, password) => async (
  dispatch,
  getState
) => {
  // password includes newPassword, currentPassword, confirmPassword
  const { user, isTeacher } = getState().auth;
  try {
    const res = await axios.put(
      `api/users/${user.id}`,
      {
        username: user.username,
        email: user.image,
        password: password.newPassword,
        fullname: user.fullname,
        role: isTeacher ? "ROLE_TEACHER" : "ROLE_ADMIN",
      },
      {
        headers: { Authorization: localStorage.token },
      }
    );

    dispatch({
      type: CLEAR_ERRORS,
    });
    setLoading(false);
    Swal.fire({
      // using sweetalert2
      position: "center",
      type: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    logoutUser(dispatch, error);
    dispatch({
      type: GET_ERRORS,
      errors: error.response.data,
    });
  }
};


// ADD NEW Course
export const updateUserAvatar = (
  setLoading,
  image
) => async (dispatch, getState) => {
  try {
    const { user } = getState().auth;
    const imageData = new FormData();
    imageData.append("file", image);
    
    const res = await axios.post(
      `api/users/upload/${user.id}`,
      imageData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.token,
        },
      }
    );
    dispatch({
      type: CLEAR_ERRORS,
    });
    setLoading(false);
    // using sweetalert2
    Swal.fire({
      position: "center",
      type: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    console.log(error);
    logoutUser(dispatch, error);
    dispatch({
      type: GET_ERRORS,
      errors: error.response.data,
    });
  }
};