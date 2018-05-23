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
import { replace } from 'react-router-redux';
import Storage from 'lib/storage';
import { api } from 'lib/api';
import uuid from 'uuid/v1';
import { reset } from '../../Reset/store/actions';

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

// TODO переместить в отдельный компонент + переделать логаут
export const logout = () => (dispatch) => {
  Storage.clear();
  dispatch(replace('/auth/signin'));
};

export const signin = () => (dispatch, getState) => {
  const { login, password, isError } = getState().Auth_Signin;

  dispatch(setIsLoading(true));

  if (isError) {
    return;
  }

  api.auth.authorization(login, password)
    .then((data) => {
      dispatch(setIsLoading(false));

      if (data.status !== 200) {
        Storage.clear();
        dispatch(send({
          id: uuid(),
          status: 'error',
          title: 'Ошибка',
          message: 'Ошибка авторизации',
          timeout: 3500
        }));
        return;
      }

      const { authorizationToken, members } = data.data;

      Storage.set('session', authorizationToken);
      Storage.set('members', members);
      dispatch(reset());
      dispatch(replace('/dashboard/'));
    })
    .catch((error) => {
      const { code } = error.response.data;

      if (code === 'INVALID_LOGIN_OR_PASS') {
        dispatch(send({
          id: uuid(),
          status: 'error',
          title: 'Ошибка',
          message: 'Неверный логин или пароль',
          timeout: 3000
        }));
      } else {
        dispatch(send({
          id: uuid(),
          status: 'error',
          title: 'Ошибка',
          message: 'Ошибка сервера',
          timeout: 3500
        }));
      }

      dispatch(changeLogin(''));
      dispatch(changePassword(''));
      dispatch(setIsLoading(false));
    });

};
