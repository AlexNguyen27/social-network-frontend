import axios from "../../utils/axios";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  EDIT_USER_INFO,
  GET_USERS,
  DELETE_USER,
  EDIT_USER,
  BASE_URL,
} from "./types";
import { arrayToObject } from "../../utils/commonFunction";
import { hera } from "hera-js";
import Swal from "sweetalert2";
import { graphqlRequest } from "../../utils/graphqlRequest";
import logoutDispatch from "../../utils/logoutDispatch";
// GET majors data
export const getUsers = (setLoading) => async (dispatch, getState) => {
  const { token } = getState().auth;

  const { data, errors } = await hera({
    option: {
      url: BASE_URL,
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
          query {
            getUsers{
              id
              username
              firstName,
              lastName,
              email,
              phone,
              address,
              imageUrl,
              githubUsername,
              role,
              createdAt,
              updatedAt
            }
          }
        `,
    variables: {},
  });

  if (!errors) {
    const usersListObj = arrayToObject(data.getUsers);

    dispatch({
      type: GET_USERS,
      users: usersListObj,
    });

    setLoading(false);
  } else {
    console.log(errors);
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

export const updatePassword = (setLoading, password) => async (
  dispatch,
  getState
) => {
  // password includes newPassword, currentPassword, confirmPassword
  // const { user, isUser } = getState().auth;
  // try {
  //   const res = await axios.put(
  //     `api/users/change_password/${user.id}`,
  //     {
  //       currentPassword: password.currentPassword,
  //       newPassword: password.newPassword,
  //     },
  //     {
  //       headers: { Authorization: localStorage.token },
  //     }
  //   );

  //   dispatch({
  //     type: CLEAR_ERRORS,
  //   });
  //   setLoading(false);
  //   Swal.fire({
  //     // using sweetalert2
  //     position: "center",
  //     type: "success",
  //     title: "Your work has been saved",
  //     showConfirmButton: false,
  //     timer: 1500,
  //   });
  // } catch (error) {
  //   logoutDispatch(dispatch, error);
  //   dispatch({
  //     type: GET_ERRORS,
  //     errors: errors[0].message,
  //   });
  //   setLoading(false);
  // }
};

// export const editUserInfo = (setLoading, userData, image) => async (
//   dispatch,
//   getState
// ) => {
  // try {
  //   const { user, isUser } = getState().auth;

  //   if (image) {
  //     const imageData = new FormData();
  //     imageData.append("file", image);

  //     const res = await axios.post(`api/users/upload/${user.id}`, imageData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: localStorage.token,
  //       },
  //     });

  //     dispatch({
  //       type: EDIT_USER_INFO,
  //       userInfo: {
  //         image: res.data.data.image,
  //       },
  //     });
  //   } else {
  //     userData.role = isUser ? "ROLE_TEACHER" : "ROLE_ADMIN";
  //     const res = await axios.put(
  //       `api/users/update_profile/${user.id}`,
  //       userData,
  //       {
  //         headers: {
  //           Authorization: localStorage.token,
  //         },
  //       }
  //     );

  //     dispatch({
  //       type: EDIT_USER_INFO,
  //       userInfo: {
  //         email: res.data.data.email,
  //         fullname: res.data.data.fullname,
  //       },
  //     });
  //   }

  //   dispatch({
  //     type: CLEAR_ERRORS,
  //   });

  //   setLoading(false);
  //   // using sweetalert2
  //   Swal.fire({
  //     position: "center",
  //     type: "success",
  //     title: "Your work has been saved",
  //     showConfirmButton: false,
  //     timer: 1500,
  //   });
  // } catch (errors) {
  //   console.log(error);
  //   logoutDispatch(dispatch, errors);
  //   dispatch({
  //     type: GET_ERRORS,
  //     errors: errors[0].message,
  //   });
  // }
// };

export const editUserInfo = (setLoading, userData) => async (
  dispatch,
  getState
) => {
  console.log('userdata-------------', userData);
  const state = getState();
  const { auth: { token }, user: { current_user: { id }}} = state;
  const { data, errors } = await hera({
    option: {
      url: "http://localhost:9000/graphql",
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
        mutation {
          updateUser(info: $info) {
            id
            username
            firstName,
            lastName,
            email,
            phone,
            address,
            imageUrl,
            githubUsername,
            createdAt,
            updatedAt
          }
        }
      `,
    variables: {
      info: {
        id,
        ...userData
      },
    },
  });

  if (!errors) {
    const res = data.updateUser;
    dispatch({
      type: EDIT_USER,
      selectedId: res.id,
      newUser: res,
    });

    dispatch({
      type: CLEAR_ERRORS,
    });

    setLoading(false);
    // using sweetalert2
    Swal.fire({
      position: "center",
      type: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    console.log(errors);
    const error = errors[0].extensions.payload ? errors[0].extensions.payload : errors[0].message;
    const formatedError = {};
    errors[0].extensions.payload && Object.keys(error).map(key => {
      formatedError[key] = error[key].message
    })
    console.log(formatedError);

    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: {...formatedError},
    });
  }
};

// DELETE GROUP
export const deleteUser = (setLoading, userId) => async (
  dispatch,
  getState
) => {
  const { token } = getState().auth;

  const { data, errors } = await hera({
    option: {
      url: "http://localhost:9000/graphql",
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
          mutation {
            deleteUser(id: $id) {
             status
             message
            }
          }
        `,
    variables: {
      id: userId,
    },
  });

  if (!errors) {
    dispatch({
      type: DELETE_USER,
      selectedId: userId,
    });

    dispatch({
      type: CLEAR_ERRORS,
    });

    setLoading(false);
    // using sweetalert2
    Swal.fire({
      position: "center",
      type: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};
