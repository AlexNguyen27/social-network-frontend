import { GET_LECTURE_DETAIL, UNAUTHENTICATE } from "../actions/types";

const initialState = {
  lecture: {
    lecture_detail: {},
  },
};

export default function (state = initialState, action) {
  const { type, lecture_detail } = action;
  switch (type) {
    case GET_LECTURE_DETAIL:
      return {
        lecture_detail,
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
