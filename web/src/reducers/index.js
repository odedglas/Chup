import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authentication from './authentication';
import rooms from './rooms';
import room from './room';
import socket from './socket';

const appReducer = combineReducers({
  form,
  authentication,
  rooms,
  room,
  socket
});

export default function (state, action) {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
}