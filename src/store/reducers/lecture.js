import { GET_LECTURE_DETAIL } from "../actions/types";

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
        lecture: {
          ...state,
          lecture_detail,
        },
      };
    default:
      return state;
  }
}
