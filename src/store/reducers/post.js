import {
  UNAUTHENTICATE,
  GET_POSTS,
  EDIT_POST,
  ADD_POST,
  DELETE_POST,
} from "../actions/types";

const initialState = {
  posts: {},
};

export default function (state = initialState, action) {
  const { type, posts, selectedId } = action;
  switch (type) {
    case GET_POSTS:
      return {
        posts: { ...posts },
      };
    case EDIT_POST:
    case ADD_POST:
      const post = action.post;
      return {
        ...state,
        [post.id]: post,
      };
    case DELETE_POST:
      const newPosts = state.posts;
      delete newPosts[selectedId];
      return {
        ...state,
        posts: newPosts,
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
