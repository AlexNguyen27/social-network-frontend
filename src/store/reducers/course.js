import {
  GET_COURSES,
  GET_COURSE_DETAIL,
  GET_USER_COURSES,
  UNAUTHENTICATE,
} from "../actions/types";

const initialState = {
  all_courses: {},
  user_courses: {},
  course_detail: {},
};

export default function (state = initialState, action) {
  const { type, all_courses, user_courses, course_detail } = action;
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
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
