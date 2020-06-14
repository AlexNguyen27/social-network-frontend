import axios from '../../utils/axios';
import logoutDispatch from '../../utils/logoutDispatch';

import { GET_ERRORS, GET_USER_COURSES, AUTHENTICATE, GET_COURSES, GET_COURSE_DETAIL } from './types';

import { logoutUser } from './auth';
import { arrayToObject } from '../../utils/commonFunction';
// GET majors data
export const getCourses = (setLoading) => async (dispatch) => {
  try {
    const allCoursesArray = await axios.get('/api/all-courses', {
      headers: { Authorization: localStorage.token },
    });

    console.log(allCoursesArray);

    const allCoursesToObject = arrayToObject(allCoursesArray.data.data);

    dispatch({
      type: GET_COURSES,
      all_courses: allCoursesToObject,
    });

    setLoading(false);
  } catch (error) {
    console.log(error)
    logoutUser(dispatch, error);
    dispatch({
      type: GET_ERRORS,
      errors: error.response.data,
    });
  }
};

export const getUserCourses = (setLoading, userId) => async (dispatch) => {
  try {
    const userCoursesArray = await axios.get(`/api/users/${userId}/courses`, {
      headers: { Authorization: localStorage.token },
    });

    console.log(userCoursesArray);

    const userCoursesToObject = arrayToObject(userCoursesArray.data.data);

    console.log(userCoursesArray);
    dispatch({
      type: GET_USER_COURSES,
      user_courses: userCoursesToObject
    });

    setLoading(false);
  } catch (error) {
    console.log(error)
    logoutUser(dispatch, error);
    dispatch({
      type: GET_ERRORS,
      errors: error.response.data,
    });
  }
};

export const getCourseById = (id) => async (dispatch, getState) => {
  const { all_courses } = getState().course;
  try {
    dispatch({
      type: GET_COURSE_DETAIL,
      course_detail: all_courses[id]
    })

  } catch (error) {
    logoutUser(dispatch, error);
    dispatch({
      type: GET_ERRORS,
      errors: error
    });
  }
}