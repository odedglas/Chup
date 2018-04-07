import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authentication from './authentication';

const appReducer = combineReducers({
  form,
  authentication
});

export default function (state, action) {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
}