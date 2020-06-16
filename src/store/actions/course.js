import axios from "../../utils/axios";
import logoutDispatch from "../../utils/logoutDispatch";

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
} from "./types";

import { logoutUser } from "./auth";
import { arrayToObject } from "../../utils/commonFunction";
import Swal from "sweetalert2";
// GET majors data
export const getCourses = (setLoading) => async (dispatch) => {
  try {
    const allCoursesArray = await axios.get("/api/all-courses", {
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
    console.log(error);
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
      user_courses: userCoursesToObject,
    });

    setLoading(false);
  } catch (error) {
    console.log(error);
    logoutUser(dispatch, error);
    dispatch({
      type: GET_ERRORS,
      errors: error.response.data,
    });
  }
};

export const getCourseById = (setLoading, id) => async (dispatch, getState) => {
  const { all_courses } = getState().course;
  try {
    // console.log("here", all_courses[id]);

    // const coursesArray = await axios.get(`/api/courses/courses/${id}`, {
    //   headers: { Authorization: localStorage.token },
    // });

    const lecturesArray = await axios.get(`/api/lectures/courses/${id}`, {
      headers: { Authorization: localStorage.token },
    });
    // console.log(lecturesArray);
    const lecturesObject = arrayToObject(lecturesArray.data.data);
    // console.log(lectureToObj);
    const {
      id: courseId,
      image,
      description,
      active,
      name,
      totalStudentEnroll,
    } = all_courses[id].course;

    const courseInfo = {
      id: courseId,
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
        teacher: all_courses[id].teacher,
        lectures: lecturesObject,
      },
    });

    // dispatch({
    //   type: GET_LECTURES,
    //   lectures: ,
    // });

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
      "api/courses",
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
    fileData.append("file", imageFile);
    const courseWithImage = await axios.post(
      `api/courses/upload/${newCourse.course.id}`,
      fileData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.token,
        },
      }
    );

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

    // TODO : FIX RETURN VALUE KHI UPLOAD IMAGE
    if (imageFile !== "same") {
      const fileData = new FormData();
      fileData.append("file", imageFile);
      const courseWithImage = await axios.post(
        `api/courses/upload/${courseId}`,
        fileData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.token,
          },
        }
      );
    }

    dispatch({
      type: EDIT_COURSE,
      newCourse: res.data.data,
    });

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
