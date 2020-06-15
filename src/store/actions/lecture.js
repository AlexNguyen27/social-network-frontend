import axios from "../../utils/axios";
import logoutDispatch from "../../utils/logoutDispatch";
import {
  DELETE_LECTURE,
  ADD_LECTURE,
  EDIT_LECTURE,
  CLEAR_ERRORS,
  GET_ERRORS,
} from "./types";
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
      lectureId: lectureId,
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
    console.log(error);
    logoutUser(dispatch, error);
    dispatch({
      type: GET_ERRORS,
      errors: error.response.data,
    });
  }
};

// ADD NEW Course
export const addNewLecture = (courseId, name, description, image, video) => async (
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

    const imageData = new FormData();
    imageData.append("file", image);
    const lectureWithImage = await axios.post(
      `api/lectures/upload/${newLecture.id}`,
      imageData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.token,
        },
      }
    );

    console.log("iamge res----------", lectureWithImage);
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
    console.log(error);
    logoutUser(dispatch, error);
    dispatch({
      type: GET_ERRORS,
      errors: error.response.data,
    });
  }
};

// EDIT Course NAME
export const editLecture = (
  lectureId,
  name,
  description,
  image,
  video
) => async (dispatch) => {
  try {
    // TODO
    // add description
    const res = await axios.put(
      `api/lectures/${lectureId}`,
      {
        name,
      },
      {
        headers: {
          Authorization: localStorage.token,
        },
      }
    );

    const imageData = new FormData();
    imageData.append("file", image);
    const lectureWithImage = await axios.post(
      `api/lectures/upload/${lectureId}`,
      imageData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.token,
        },
      }
    );

    const videoData = new FormData();
    videoData.append("file", video);
    const lectureWithVideo = await axios.post(
      `api/lectures/upload/${lectureId}`,
      videoData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.token,
        },
      }
    );

    console.log("iamge res----------", lectureWithImage);

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
