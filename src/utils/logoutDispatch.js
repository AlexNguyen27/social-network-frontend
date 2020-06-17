import { UNAUTHENTICATE } from "../store/actions/types";
export default (dispatch, error = null) => {
  // 401 : UNAUTHORIZED
  if (!error || (error.response && error.response.status === 401)) {
    console.log("dispatch --------------------");
    dispatch({
      type: UNAUTHENTICATE,
    });
  }
};
