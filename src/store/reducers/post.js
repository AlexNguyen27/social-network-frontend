import {
  UNAUTHENTICATE,
  GET_POSTS,
  EDIT_POST,
  ADD_POST,
  DELETE_POST,
  GET_SELECTED_POST,
} from "../actions/types";

const initialState = {
  posts: {},
  selected_post: {},
};

export default function (state = initialState, action) {
  const { type, posts, selectedId, post } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: { ...posts },
      };
    case ADD_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [post.id]: post,
        },
      };
    case EDIT_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [post.id]: { ...state.posts[post.id], ...post },
        },
      };
    case DELETE_POST:
      const newPosts = state.posts;
      delete newPosts[selectedId];
      return {
        ...state,
        posts: newPosts,
      };
    case GET_SELECTED_POST:
      return {
        ...state,
        selected_post: post,
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
