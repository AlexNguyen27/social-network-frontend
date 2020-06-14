import {
  GET_COURSES,
  GET_COURSE_DETAIL,
  UNAUTHENTICATE,
} from '../actions/types';

const initialState = {
  courses: [],
  course_detail: {},
};

export default function (state = initialState, action) {
  const { type, courses, course_detail } = action;
  switch (type) {
    case GET_COURSES:
      return {
        ...state,
        courses,
      };
    case GET_COURSE_DETAIL:
      return {
        ...state,
        detail: { ...state.course_detail, ...course_detail },
      };
    case UNAUTHENTICATE:
      return state;
    default:
      return state;
  }
}
