import {
  GET_USERS,
  UNAUTHENTICATE,
  DELETE_USER,
  EDIT_USER,
} from "../actions/types";

const initialState = {
  users: {},
};

export default function (state = initialState, action) {
  const { type, users } = action;
  switch (type) {
    case GET_USERS:
      return {
        ...state.user,
        users,
      };
    case EDIT_USER:
      const { newUser, selectedId } = action;
      return {
        users: { ...state.users, [selectedId]: newUser },
      };
    case DELETE_USER:
      const newUsers = state.users;
      delete newUsers[action.selectedId];
      return {
        users: newUsers,
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
