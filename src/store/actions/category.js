import logoutDispatch from "../../utils/logoutDispatch";
import { GET_ERRORS, CLEAR_ERRORS, AUTHENTICATE, BASE_URL, GET_POSTS, GET_CATEGORIES } from "./types";
import { hera } from "hera-js";
import { arrayToObject } from "../../utils/commonFunction";

//LOGIN User
export const getCategories = () => async (dispatch, getState) => {
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
                getCategories {
                    id, 
                    name,
                    status, 
                    createdAt,
                    # posts {
                    #   id
                    # }
                  }
            }
        `,
    variables: {},
  });
  if (!errors) {
    const categories = arrayToObject(data.getCategories);

    dispatch({
      type: GET_CATEGORIES,
      categories,
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
