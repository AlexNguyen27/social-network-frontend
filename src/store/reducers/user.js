import {
  GET_USERS,
  UNAUTHENTICATE,
  DELETE_USER,
  EDIT_USER,
  SAVE_CURRENT_USER
} from "../actions/types";

const initialState = {
  users: {},
  current_user: {}
};

export default function (state = initialState, action) {
  const { type, users } = action;
  switch (type) {
    case GET_USERS:
      return {
        users,
      };
    case EDIT_USER:
      const { newUser, selectedId } = action;
      return {
        users: { ...state.users, [selectedId]: newUser },
        current_user: newUser
      };
    case DELETE_USER:
      const newUsers = state.users;
      delete newUsers[action.selectedId];
      return {
        users: newUsers,
      };
    case SAVE_CURRENT_USER:
      const { currentUser } = action; 
      return {
        ...state,
        current_user: currentUser
      }
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
