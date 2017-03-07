import JWT from 'jwt-client';

import store from '../store';
import AuthService from '../services/AuthService';
import setAuthorizationToken from '../utils/setAuthorizationToken';

import { LOGIN, LOGIN_SUCCESS, SET_CURRENT_USER, LOGOUT } from './types/authTypes';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function login(login, password) {
  store.dispatchAsync(
    AuthService.login(login, password)
    .then((res) => {
      const token = res.data.token;

      JWT.keep(token);
      setAuthorizationToken(token);

      // dispatch action to set user
      const readableToken = JWT.read(token);
      store.dispatch(setCurrentUser(readableToken.claim));

      return token;
    }), 
  {
    request: LOGIN,
    success: LOGIN_SUCCESS,
    dispatchErrorMessage: true,
    silent: false
  });
};

export function logout() {
  setAuthorizationToken();
  localStorage.removeItem('jwtToken');

  store.dispatch({ type: LOGOUT });
}
