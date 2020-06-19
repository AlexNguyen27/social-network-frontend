import axios from "../../utils/axios";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  EDIT_USER_INFO,
  GET_USERS,
  DELETE_USER,
  EDIT_USER,
} from "./types";
import { logoutUser } from "./auth";
import { arrayToObject } from "../../utils/commonFunction";
import Swal from "sweetalert2";

// GET majors data
export const getUsers = (setLoading) => async (dispatch) => {
  try {
    console.log("serkkkkkkkkkkkkkkkkkkkkkkkkk");
    const usersList = await axios.get("/api/users", {
      headers: { Authorization: localStorage.token },
    });

    const usersListObj = arrayToObject(usersList.data.data);

    dispatch({
      type: GET_USERS,
      users: usersListObj,
    });

    setLoading(false);
  } catch (error) {
    logoutUser(dispatch, error);
    dispatch({
      type: GET_ERRORS,
      errors: error.response.data,
    });
  }
};

export const updatePassword = (setLoading, password) => async (
  dispatch,
  getState
) => {
  // password includes newPassword, currentPassword, confirmPassword
  const { user, isTeacher } = getState().auth;
  try {
    const res = await axios.put(
      `api/users/change_password/${user.id}`,
      {
        currentPassword: password.currentPassword,
        newPassword: password.newPassword,
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
    setLoading(false);
  }
};

// ADD NEW Course
export const editUserInfo = (setLoading, userData, image) => async (
  dispatch,
  getState
) => {
  try {
    const { user, isTeacher, isAdmin } = getState().auth;

    if (image) {
      const imageData = new FormData();
      imageData.append("file", image);

      const res = await axios.put(
        `api/users/uploads/${userData.id || user.id}`,
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.token,
          },
        }
      );

      dispatch({
        type: EDIT_USER_INFO,
        userInfo: {
          image: res.data.data.image,
        },
      });
    } else {
      // userData.role="ROLE_ADMIN"
      const userId = isAdmin ? userData.id : user.id;
      const res = await axios.put(
        `api/users/update_profile/${userId}`,
        userData,
        {
          headers: {
            Authorization: localStorage.token,
          },
        }
      );

      if (!userData.id) {
        dispatch({
          type: EDIT_USER_INFO,
          userInfo: {
            email: res.data.data.email,
            fullname: res.data.data.fullname,
          },
        });
      }

      if (isAdmin) {
        dispatch({
          type: EDIT_USER,
          selectedId: res.data.data.id,
          newUser: res.data.data,
        });
      }
    }

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

// DELETE GROUP
export const deleteUser = (setLoading, userId) => async (dispatch) => {
  try {
    await axios.delete(`api/users/${userId}`, {
      headers: { Authorization: localStorage.token },
    });

    dispatch({
      type: DELETE_USER,
      selectedId: userId,
    });

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
    logoutUser(dispatch, error);
    dispatch({
      type: GET_ERRORS,
      errors: error.response.data,
    });
  }
};
