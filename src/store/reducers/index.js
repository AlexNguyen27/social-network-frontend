import { combineReducers } from 'redux';
import errors from './errors';
import auth from './auth';
import course from './course';

export default combineReducers({
  auth,
  course,
  errors,
});
