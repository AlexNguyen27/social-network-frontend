import { UNAUTHENTICATE } from "../actions/types";
export default (dispatch, error = null) => {
  // 401 : UNAUTHORIZED
  if (!error || (error.response && error.response.status === 401)) {
    dispatch({
      type: UNAUTHENTICATE
    });
  }
};
