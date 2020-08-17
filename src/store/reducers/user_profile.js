import {
  GET_USER_PROFILE,
  UNAUTHENTICATE,
  GET_FRIEND_PROFILE,
} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, user_profile, friend_profile } = action;
  switch (type) {
    case GET_USER_PROFILE:
      return {
        user_profile,
      };
    case GET_FRIEND_PROFILE:
      return {
        friend_profile,
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
