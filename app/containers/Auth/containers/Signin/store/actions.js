import {
  CHANGE_LOGIN,
  CHANGE_PASSWORD,
  SET_IS_PHONE,
  SET_IS_LOADING,
  SET_ERROR,
} from './types';
import { reducer as notifReducer, actions as notifActions, Notifs } from 'redux-notifications';
import { api } from 'lib/api';


export const changeLogin = (login) => ({
  type: CHANGE_LOGIN,
  payload: login
});

export const changePassword = (country) => ({
  type: CHANGE_PASSWORD,
  payload: country
});

export const setError = (error = false) => ({
  type: SET_ERROR,
  payload: error
});

export const setIsPhone = (isPhone = false) => ({
  type: SET_IS_PHONE,
  payload: isPhone
});

export const setIsLoading = (isLoading = false) => ({
  type: SET_IS_LOADING,
  payload: isLoading
});

const { notifSend } = notifActions;

export const signin = () => (dispatch, getState) => {
  const { login, password, isError } = getState().Auth_Signin;

  dispatch(setIsLoading(true));

  if (isError) {
    return;
  }

  setTimeout(() => {
    dispatch(setIsLoading(false))
    dispatch(notifSend({
      message: 'Error: Couldn\'t connect to the server. Check your network connection',
      kind: 'danger',
      dismissAfter: 5000,
      id: 1337
    }));
  }, 1500)
};
