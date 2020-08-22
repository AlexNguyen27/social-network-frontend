import logoutDispatch from "../../utils/logoutDispatch";
import { GET_ERRORS, CLEAR_ERRORS, BASE_URL, FOLLOW_UNFOLLOW } from "./types";
import { hera } from "hera-js";

// token provided => get fromUserId
export const addComment = (setLoading, comment, postId, parentId = null ) => async (
  dispatch,
  getState
) => {
  const {
    token,
    user: { id: userId },
  } = getState().auth;

  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
        mutation {
            createComment(
                comment: $comment,
                userId: $userId,
                postId:  $postId,
                parentId: $parentId,
              ){
                id
                comment
                userId
                postId
                parentId
                createdAt
                updatedAt
              }
        }
      `,
    variables: {
      comment,
      userId,
      postId,
      parentId
    },
  });

  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

  
  } else {
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};
