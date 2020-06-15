import axios from "../../utils/axios";
import logoutDispatch from "../../utils/logoutDispatch";
import { DELETE_LECTURE, ADD_LECTURE, EDIT_LECTURE, CLEAR_ERRORS, GET_ERRORS } from "./types";
import Swal from "sweetalert2";
import { logoutUser } from "./auth";

// DELETE LECTURE
export const deleteLecture = (lectureId) => async (dispatch) => {
  try {
    await axios.delete(`api/lectures/${lectureId}`, {
      headers: { Authorization: localStorage.token },
    });

    dispatch({
      type: DELETE_LECTURE,
      lectureId,
    });

    dispatch({
      type: CLEAR_ERRORS,
    });
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

// ADD NEW Course
export const addNewLecture = (courseId, name, description) => async (
  dispatch
) => {
  try {
    // TODO
    // add description
    const res = await axios.post(
      `api/lectures/courses/${courseId}`,
      {
        name,
      },
      {
        headers: { Authorization: localStorage.token },
      }
    );

    const newLecture = res.data.data;
    dispatch({
      type: ADD_LECTURE,
      newLecture,
    });

    dispatch({
      type: CLEAR_ERRORS,
    });
    // using sweetalert2
    Swal.fire({
      position: "center",
      type: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    console.log(error)
    logoutUser(dispatch, error);
    dispatch({
      type: GET_ERRORS,
      errors: error.response.data,
    });
  }
};

// EDIT Course NAME
export const editLecture = (lectureId, name, description) => async (
  dispatch
) => {
  try {
    // TODO
    // add description
    const res = await axios.put(
      `api/lectures/${lectureId}`,
      {
        name,
      },
      {
        headers: { Authorization: localStorage.token },
      }
    );

    dispatch({
      type: EDIT_LECTURE,
      newLecture: res.data.data,
    });

    dispatch({
      type: CLEAR_ERRORS,
    });

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
