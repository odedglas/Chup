import { reset } from 'redux-form';
import api from '../api';
import { fetchUserRooms } from './rooms';

function setCurrentUser(dispatch, response) {

  //Auth was successfully
  localStorage.setItem('token', JSON.stringify(response.meta.token));
  dispatch({ type: 'AUTHENTICATION_SUCCESS', response });

  //Fetching User rooms
  dispatch(fetchUserRooms(response.data.id));
}

export function login(data, router) {
  return dispatch => api.post('/login', data)
  .then((response) => {
    setCurrentUser(dispatch, response);
    dispatch(reset('login'));
    router.transitionTo('/');
  });
}

export function signup(data, router) {
  return dispatch => api.post('/signup', data)
  .then((response) => {
    setCurrentUser(dispatch, response);
    dispatch(reset('signup'));
    router.transitionTo('/');
  });
}

export function logout(router) {
  return dispatch => api.delete('/logout')
  .then(() => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    router.transitionTo('/login');
  });
}

export function authenticate() {
  return (dispatch) => {
    dispatch({ type: 'AUTHENTICATION_REQUEST' });
    return api.post('/refresh-token')
    .then((response) => {
      setCurrentUser(dispatch, response);
    })
    .catch(() => {
      localStorage.removeItem('token');
      window.location = '/login';
    });
  };
}

export const unauthenticate = () => ({ type: 'AUTHENTICATION_FAILURE' });