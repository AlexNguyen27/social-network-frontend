import axios from '../../utils/axios';

import {
  GET_ERRORS,
  GET_USER_COURSES,
  AUTHENTICATE,
  GET_COURSES,
  GET_COURSE_DETAIL,
  DELETE_COURSE,
  CLEAR_ERRORS,
  ADD_COURSE,
  EDIT_COURSE,
} from './types';

import { logoutUser } from './auth';
import { arrayToObject } from '../../utils/commonFunction';
import Swal from 'sweetalert2';

// GET ALL COURSE
export const getCourses = (setLoading) => async (dispatch) => {
  try {
    const allCoursesArray = await axios.get('/api/all-courses', {
      headers: { Authorization: localStorage.token },
    });

    const allCoursesToObject = arrayToObject(allCoursesArray.data.data);

    dispatch({
      type: GET_COURSES,
      all_courses: allCoursesToObject,
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


// GET USER COURSE
export const getUserCourses = (setLoading, userId) => async (dispatch) => {
  try {
    const userCoursesArray = await axios.get(`/api/users/${userId}/courses`, {
      headers: { Authorization: localStorage.token },
    });

    const userCoursesToObject = arrayToObject(userCoursesArray.data.data);

    dispatch({
      type: GET_USER_COURSES,
      user_courses: userCoursesToObject,
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

export const getCourseById = (setLoading, courseId) => async (
  dispatch,
  getState
) => {
  const { user_courses, all_courses } = getState().course;
  try {
    // console.log("here", all_courses[courseId]);

    // const coursesArray = await axios.get(`/api/courses/courses/${courseId}`, {
    //   headers: { Authorization: localStorage.token },
    // });

    const lecturesArray = await axios.get(`/api/lectures/courses/${courseId}`, {
      headers: { Authorization: localStorage.token },
    });
    const lecturesObject = arrayToObject(lecturesArray.data.data);
    const course = all_courses[courseId]
      ? all_courses[courseId]
      : user_courses[courseId];
    const {
      id,
      image,
      description,
      active,
      name,
      totalStudentEnroll,
    } = course.course;

    const courseInfo = {
      id,
      image,
      description,
      active,
      name,
      totalStudentEnroll,
    };

    dispatch({
      type: GET_COURSE_DETAIL,
      course_detail: {
        course: courseInfo,
        teacher: course.teacher,
        lectures: lecturesObject,
      },
    });

    setLoading(false);
  } catch (error) {
    logoutUser(dispatch, error);
    dispatch({
      type: GET_ERRORS,
      errors: error,
    });
  }
};

// DELETE GROUP
export const deleteCourse = (setLoading, courseId) => async (dispatch) => {
  try {
    // console.log('courseid----------', courseId);
    await axios.delete(`api/courses/${courseId}`, {
      headers: { Authorization: localStorage.token },
    });

    dispatch({
      type: DELETE_COURSE,
      selectedId: courseId,
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

// ADD NEW Course
export const addNewCourse = (
  setLoading,
  courseName,
  courseDescription,
  imageFile,
  isActive
) => async (dispatch) => {
  try {
    // Passing: groupName, categoryId
    const res = await axios.post(
      'api/courses',
      {
        name: courseName,
        description: courseDescription,
        active: isActive,
      },
      {
        headers: { Authorization: localStorage.token },
      }
    );

    const newCourse = res.data.data;
    // TODO
    // UPLOAD FILE
    const fileData = new FormData();
    fileData.append('file', imageFile);
    const courseWithImage = await axios.post(
      `api/courses/upload/${newCourse.course.id}`,
      fileData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.token,
        },
      }
    );

    newCourse.image = courseWithImage.data.data.image;
    dispatch({
      type: ADD_COURSE,
      newCourse: newCourse,
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

// EDIT Course NAME
export const editCourse = (
  setLoading,
  courseId,
  courseName,
  courseDescription,
  imageFile,
  isActive
) => async (dispatch) => {
  try {
    const res = await axios.put(
      `api/courses/${courseId}`,
      {
        name: courseName,
        description: courseDescription,
        active: isActive,
      },
      {
        headers: { Authorization: localStorage.token },
      }
    );

    const newCourse = res.data.data;
    // TODO : FIX RETURN VALUE KHI UPLOAD IMAGE
    if (imageFile !== 'same') {
      const fileData = new FormData();
      fileData.append('file', imageFile);
      const courseWithImage = await axios.post(
        `api/courses/upload/${courseId}`,
        fileData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.token,
          },
        }
      );
      newCourse.image = courseWithImage.data.data.image;
    }

    dispatch({
      type: EDIT_COURSE,
      newCourse,
    });

    dispatch({
      type: CLEAR_ERRORS,
    });
    setLoading(false);
    Swal.fire({
      // using sweetalert2
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
