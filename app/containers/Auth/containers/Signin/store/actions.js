import { replace } from 'react-router-redux';
import {
  CHANGE_LOGIN,
  CHANGE_PASSWORD,
  SET_IS_PHONE,
  SET_IS_LOADING,
  SET_IS_BLOCKED,
  SET_ERROR_MESSAGE,
  SET_ERROR,
} from './types';
import { reset } from '../../Reset/store/actions';
import Storage from 'lib/storage';
import { api } from 'lib/api';
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

export const setErrorMessage = (message = '') => ({
  type: SET_ERROR_MESSAGE,
  payload: message
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
  dispatch(setErrorMessage(''));

  if (isError) {
    return;
  }

  api.auth.authorization(login, password)
    .then((data) => {

      dispatch(setIsLoading(false));

      if (data.status !== 200) {
        Storage.clear();
        dispatch(setErrorMessage('Ошибка авторизации'));
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

      dispatch(setIsLoading(false));
      switch (code) {
        case 'USER_BANNED':
          const dateBanned = message.split(' ');
          const dateBannedFormated = moment(dateBanned[dateBanned.length - 1]);
          const time = setInterval(() => {
            dispatch(setErrorMessage(`Try again ${moment().to(dateBannedFormated)}`));
            if (dateBannedFormated < moment()) {
              dispatch(setErrorMessage(''));
              dispatch(setIsBlocked(false));
              clearInterval(time);
            }
          }, 10000);
          dispatch(setIsBlocked(true));
          dispatch(setErrorMessage(`Try again ${moment().to(dateBannedFormated)}`));
          break;
        case 'INVALID_LOGIN_OR_PASS':
          dispatch(setErrorMessage(message));
          break;
        default:
          dispatch(setErrorMessage('Server error'));
      }

    });

};
