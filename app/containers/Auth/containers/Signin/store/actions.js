import { replace } from 'react-router-redux';
import {
  CHANGE_LOGIN,
  CHANGE_PASSWORD,
  SET_IS_PHONE,
  SET_IS_LOADING,
  SET_BLOCKED_TIME,
  SET_IS_BLOCKED,
  SET_ERROR,
} from './types';
import { send } from 'containers/Notification/store/actions';
import { reset } from '../../Reset/store/actions';
import Storage from 'lib/storage';
import { api } from 'lib/api';
import uuid from 'uuid/v1';
import moment from 'moment';

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

export const setBlockedDate = (dateBlocked = false) => ({
  type: SET_BLOCKED_TIME,
  payload: dateBlocked
});

export const setIsBlocked = (isBlocked = false) => ({
  type: SET_IS_BLOCKED,
  payload: isBlocked
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
      const { code, message } = error.response.data;

      switch (code) {
        case 'USER_BANNED':
          const dateBanned = message.split(' ');
          const dateBannedFormated = moment(dateBanned[dateBanned.length - 1]);

          const time = setInterval(() => {
            dispatch(setBlockedDate(moment().to(dateBannedFormated)));
            if (dateBannedFormated < moment()) {
              clearInterval(time);
            }
          }, 10000);

          dispatch(setIsBlocked(true));
          dispatch(setBlockedDate(moment().to(dateBannedFormated)));
          break;
        case 'INVALID_LOGIN_OR_PASS':
          dispatch(send({
            id: uuid(),
            status: 'error',
            title: 'Ошибка',
            message: 'Неверный логин или пароль',
            timeout: 3000
          }));
          break;
        default:
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
