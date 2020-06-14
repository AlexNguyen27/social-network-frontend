import axios from '../../utils/axios';
import logoutDispatch from '../../utils/logoutDispatch';

import { GET_ERRORS, CLEAR_ERRORS, AUTHENTICATE, GET_COURSES } from './types';

import { logoutUser } from './auth';
// GET majors data
export const getCourses = (setLoading) => async (dispatch) => {
  try {
    const res = await axios.get('/api/courses', {
      headers: { Authorization: localStorage.token },
    });

    console.log(res);

    dispatch({
      type: GET_COURSES,
      courses: res.data.data,
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
