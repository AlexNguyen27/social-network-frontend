import { GET_USER_PROFILE, UNAUTHENTICATE } from "../actions/types";

const initialState = {
  posts: {
    comments: {},
    likes: {},
  },
  follwers: {},
};

export default function (state = initialState, action) {
  const { type, user_profile } = action;
  switch (type) {
    case GET_USER_PROFILE:
      return {
        ...user_profile,
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
