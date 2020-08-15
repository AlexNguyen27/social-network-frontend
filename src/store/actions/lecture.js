import axios from '../../utils/axios';
import logoutDispatch from '../../utils/logoutDispatch';
import {
  DELETE_LECTURE,
  ADD_LECTURE,
  EDIT_LECTURE,
  CLEAR_ERRORS,
  GET_ERRORS,
  GET_LECTURES,
  GET_LECTURE_DETAIL,
  GET_QUESTIONS,
} from './types';
import Swal from 'sweetalert2';
import { logoutUser } from './auth';
import { arrayToObject } from '../../utils/commonFunction';

export const getLectureByLectureId = (setLoading, lectureId) => async (
  dispatch
) => {
  try {
    const lecture = await axios.get(`/api/lectures/${lectureId}`, {
      headers: { Authorization: localStorage.token },
    });

    dispatch({
      type: GET_LECTURE_DETAIL,
      lecture_detail: lecture.data.data,
    });

    const questionsArray = await axios.get(
      `/api/questions/lectures/${lectureId}`,
      {
        headers: { Authorization: localStorage.token },
      }
    );

    const questionsObject = arrayToObject(questionsArray.data.data);

    dispatch({
      type: GET_QUESTIONS,
      questions_bank: questionsObject,
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

// DELETE LECTURE
export const deleteLecture = (setLoading, lectureId) => async (dispatch) => {
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
    setLoading(false);
    // using sweetalert2
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    // console.log(error);
    logoutUser(dispatch, error);
    dispatch({
      type: GET_ERRORS,
      errors: error.response.data,
    });
  }
};

// ADD NEW Course
export const addNewLecture = (
  setLoading,
  courseId,
  name,
  description,
  image,
  video
) => async (dispatch) => {
  try {
    // TODO
    // add description
    const res = await axios.post(
      `api/lectures/courses/${courseId}`,
      {
        name,
        description,
      },
      {
        headers: { Authorization: localStorage.token },
      }
    );

    const newLecture = res.data.data;

    const lectureId = newLecture.id;

    const imageData = new FormData();
    imageData.append('file', image);
    const lectureWithImage = await axios.post(
      `api/lectures/upload/${lectureId}`,
      imageData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.token,
        },
      }
    );

    const videoData = new FormData();
    videoData.append('file', video);
    const lectureWithVideo = await axios.post(
      `api/lectures/upload/${lectureId}`,
      videoData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.token,
        },
      }
    );

    newLecture.image = lectureWithVideo.data.data.image;
    newLecture.video = lectureWithVideo.data.data.video;
    dispatch({
      type: ADD_LECTURE,
      newLecture,
    });

    dispatch({
      type: CLEAR_ERRORS,
    });
    setLoading(false);
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Your work has been saved',
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

// EDIT Course NAME
export const editLecture = (
  setLoading,
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
        description,
      },
      {
        headers: {
          Authorization: localStorage.token,
        },
      }
    );

    const newLecture = res.data.data;
    if (image !== 'same') {
      const imageData = new FormData();
      imageData.append('file', image);
      const lectureWithImage = await axios.post(
        `api/lectures/upload/${lectureId}`,
        imageData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.token,
          },
        }
      );
      newLecture.image = lectureWithImage.data.data.image;
    }

    if (video !== 'same') {
      const videoData = new FormData();
      videoData.append('file', video);
      const lectureWithVideo = await axios.post(
        `api/lectures/upload/${lectureId}`,
        videoData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.token,
          },
        }
      );
      newLecture.video = lectureWithVideo.data.data.video;
    }

    dispatch({
      type: EDIT_LECTURE,
      newLecture,
    });

    dispatch({
      type: CLEAR_ERRORS,
    });
    setLoading(false);
    // using sweetalert2
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Your work has been saved',
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
