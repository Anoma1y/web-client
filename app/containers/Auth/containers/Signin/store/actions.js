import {
  CHANGE_LOGIN,
  CHANGE_PASSWORD,
  SET_IS_PHONE,
  SET_IS_LOADING,
  SET_ERROR,
} from './types';
import {
  send
} from 'containers/Notification/store/actions';
import { api } from 'lib/api';
import uuid from 'uuid/v1';

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

export const signin = () => (dispatch, getState) => {
  const { login, password, isError } = getState().Auth_Signin;

  dispatch(setIsLoading(true));

  if (isError) {
    return;
  }

  setTimeout(() => {
    dispatch(setIsLoading(false));
    dispatch(send({
      id: uuid(),
      status: 'error',
      title: 'Error',
      message: 'Couldn\'t connect to the server. Check your network connection',
      actionClose: true,
    }));
    dispatch(send({
      id: uuid(),
      status: 'warning',
      title: 'Attention',
      message: 'Check your network connection',
      actionClose: true,
    }));
    dispatch(send({
      id: uuid(),
      status: 'info',
      title: 'Information',
      message: 'Hello World',
      actionClose: true,
    }));
    dispatch(send({
      id: uuid(),
      status: 'success',
      title: 'Success',
      message: 'Bye world',
      actionClose: true,
    }));
  }, 1500);
};
