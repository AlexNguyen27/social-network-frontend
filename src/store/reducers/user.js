import { GET_USERS, UNAUTHENTICATE } from "../actions/types";

const initialState = {
  users: {},
  user_detail: {},
};

export default function (state = initialState, action) {
  const { type, users } = action;
  switch (type) {
    case GET_USERS:
      return {
        ...state.user,
        users,
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
