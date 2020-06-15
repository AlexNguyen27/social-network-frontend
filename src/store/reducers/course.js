import {
  GET_COURSES,
  GET_COURSE_DETAIL,
  GET_USER_COURSES,
  UNAUTHENTICATE,
  DELETE_COURSE,
  ADD_COURSE,
  EDIT_COURSE,
  REMOVE_COURSE_DETAIL,
  ADD_LECTURE,
  DELETE_LECTURE,
  EDIT_LECTURE,
} from "../actions/types";

const initialState = {
  all_courses: {},
  user_courses: {},
  course_detail: {
    course: {},
    teacher: {},
    lectures: {},
  },
};

export default function (state = initialState, action) {
  const {
    type,
    all_courses,
    user_courses,
    course_detail,
    selectedId,
    newCourse,
  } = action;
  switch (type) {
    case GET_COURSES:
      return {
        ...state,
        all_courses,
      };
    case GET_USER_COURSES:
      return {
        ...state,
        user_courses,
      };
    case GET_COURSE_DETAIL:
      return {
        ...state,
        course_detail: { ...state.course_detail, ...course_detail },
      };
    case DELETE_COURSE:
      const newObjCourses = state.all_courses;
      const newUserCourses = state.user_courses;

      delete newObjCourses[selectedId];
      delete newUserCourses[selectedId];
      return {
        ...state,
        all_courses: newObjCourses,
        user_courses: newUserCourses,
      };
    case ADD_COURSE:
    case EDIT_COURSE:
      return {
        ...state,
        all_courses: {
          ...state.all_courses,
          [newCourse.course.id]: newCourse,
        },
        user_courses: {
          ...state.user_courses,
          [newCourse.course.id]: newCourse,
        },
      };

    case REMOVE_COURSE_DETAIL:
      return {
        ...state,
        course_detail: {},
      };

    case ADD_LECTURE:
    case EDIT_LECTURE:
      const newLecture = action.newLecture;
      return {
        ...state,
        course_detail: {
          ...state.course_detail,
          lectures: {
            ...state.course_detail.lectures,
            [newLecture.id]: newLecture,
          },
        },
      };
    case DELETE_LECTURE:
      const newLecturesObj = state.course_detail.lectures;
      delete newLecturesObj[action.lectureId];

      return {
        ...state,
        course_detail: {
          ...state.course_detail,
          lectures: newLecturesObj,
        },
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
