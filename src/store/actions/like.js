import logoutDispatch from "../../utils/logoutDispatch";
import { GET_ERRORS, CLEAR_ERRORS, BASE_URL, LIKE_REACTION } from "./types";
import { hera } from "hera-js";

export const likeReaction = (
  postId,
  categoryId,
  title,
  description,
  setIsLiked,
  setTotalLike
) => async (dispatch, getState) => {
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
            createReaction(
                userId: $userId, 
                postId: $postId, 
                reactionTypeId: "9d31b9c1-e375-4dc5-9335-0c8879695163") 
                {
                    status
                    message
                }
        }
      `,
    variables: {
      userId,
      postId,
    },
  });

  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    if (data.createReaction.message.includes("Delete")) {
      dispatch({
        type: LIKE_REACTION,
        isLike: false,
        postId,
      });
      setIsLiked(false);
      setTotalLike(prev => prev - 1);
    } else {
      const newPost = {
        id: postId,
        userId: userId,
        categoryId,
        title,
        description,
      };
      dispatch({
        type: LIKE_REACTION,
        isLike: true,
        postId,
        newPost,
      });
      setTotalLike(prev => prev + 1);
      setIsLiked(true);
    }
  } else {
    console.log(errors);
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};
