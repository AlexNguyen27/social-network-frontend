import logoutDispatch from "../../utils/logoutDispatch";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  AUTHENTICATE,
  BASE_URL,
  GET_POSTS,
} from "./types";
import { hera } from "hera-js";
import { arrayToObject } from "../../utils/commonFunction";
import Swal from "sweetalert2";

//LOGIN User
export const getPosts = () => async (dispatch, getState) => {
  const { token } = getState().auth;

  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
            query {
                getPosts {
                    id
                    title
                    description
                    status
                    imageUrl
                    createdAt
                    updatedAt
                    categoryId
                    comments{
                        id
                        comment
                        userId
                        parentId
                        createdAt
                        updatedAt
                    }
                    reactions {
                        userId
                        reactionTypeId
                        postId
                    }
                    
                }
            }
        `,
    variables: {},
  });
  if (!errors) {
    const posts = arrayToObject(data.getPosts);

    dispatch({
      type: GET_POSTS,
      posts,
    });
  } else {
    console.log(errors);
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};
export const addNewPost = ({ bodyText, title, categoryId, status }) => async (
  dispatch,
  getState
) => {
  console.log(bodyText)
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
          createPost(title: $title,status: $status,description: $description,userId: $userId,categoryId: $categoryId) {
            id
            title
            description
            status
            imageUrl
            createdAt
            updatedAt
          }
        }
      `,
    variables: {
      title: title,
      status: status,
      description: bodyText,
      userId: userId,
      categoryId: categoryId,
    },
  });

  console.log(data);
  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });
    Swal.fire({
      position: "center",
      type: "success",
      title: "Added successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    console.log(errors);
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};
