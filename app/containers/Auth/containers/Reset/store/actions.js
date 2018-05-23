import {
  CHANGE_OTP,
  CHANGE_LOGIN,
  CHANGE_NEW_USER_PASSWORD,
  SET_ERROR,
  SET_IS_PHONE,
  SET_IS_LOADING,
  SET_OTP_IS_SEND,
  SET_RESEND_OTP_BLOCKED,
  RESET,
} from './types';
import { send } from 'containers/Notification/store/actions';
import { replace } from 'react-router-redux';
import { api } from 'lib/api';
import { checkIsPhone } from 'lib/auth';
import uuid from 'uuid/v1';
import Storage from '../../../../../lib/storage';

export const changeLogin = (val) => ({
  type: CHANGE_LOGIN,
  payload: val
});

export const changeNewPassword = (val) => ({
  type: CHANGE_NEW_USER_PASSWORD,
  payload: val
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

export const setOtpIsSend = (isSend = false) => ({
  type: SET_OTP_IS_SEND,
  payload: isSend
});

export const changeOTP = (otp) => ({
  type: CHANGE_OTP,
  payload: otp
});

export const blockedResendOTP = (blocked = false) => ({
  type: SET_RESEND_OTP_BLOCKED,
  payload: blocked
});

export const reset = () => ({
  type: RESET
});

/**
 * Экшен для отправки логина и рендер новой формы для ввода OTP
 * В зависимости что было отправлено (почта или телефон) придет код
 * @returns {function(*, *)}
 */
export const getOTP = () => (dispatch, getState) => {

  const { login, isError } = getState().Auth_Reset;
  let authLogin = login;

  if (isError) {
    return;
  }

  dispatch(setIsLoading(true));

  if (checkIsPhone(login)) {

    authLogin = login.replace(/\+/g, '');
    dispatch(setIsPhone(true));

  }

  api.auth.reset(authLogin)
    .then((data) => {
      if (data.status !== 200) return;

      dispatch(setOtpIsSend(true));
      dispatch(setIsLoading(false));

    })
    .catch((error) => {
      const { code } = error.response.data;

      dispatch(setIsLoading(false));
      dispatch(changeLogin(''));

      if (code === 'LOGIN_CREDENTIAL_NOT_FOUND') {
        dispatch(send({
          id: uuid(),
          status: 'error',
          title: 'Ошибка',
          message: 'Логин не существует',
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
    });
};

/**
 * Экшен для отправки ОТП
 * @returns {function(*, *)}
 */
export const sendConfirm = () => (dispatch, getState) => {
  const { login, newUserPassword, OTP, isError } = getState().Auth_Reset;
  let authLogin = login;

  if (isError) {
    return;
  }

  if (checkIsPhone(login)) {
    authLogin = login.replace(/\+/g, '');
    dispatch(setIsPhone(true));
  }

  dispatch(setIsLoading(true));
  api.auth.resetConfirm(authLogin, OTP, newUserPassword)
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
    .catch(() => {
      dispatch(setIsLoading(false));
      dispatch(send({
        id: uuid(),
        status: 'error',
        title: 'Ошибка',
        message: 'Ошибка сервера',
        timeout: 3500
      }));
    });
}

/**
 * Экшен для повторной отправки ОТП
 * При активации экшена (в независимости от результата) блочиться кнопка повторной отправки
 * @returns {function(*, *)}
 */
export const resendOTP = () => (dispatch, getState) => {
  const { login, resendOTPIsBlocked, isError, isPhone } = getState().Auth_Reset;
  let authLogin = login;
  dispatch(changeOTP(''));

  if (resendOTPIsBlocked || isError) {
    return;
  }

  if (checkIsPhone(login)) {
    authLogin = login.replace(/\+/g, '');
    dispatch(setIsPhone(true));
  }

  dispatch(setIsLoading(true));
  dispatch(blockedResendOTP(true));

  api.auth.resetResendOTP(authLogin)
    .then(() => {
      dispatch(send({
        id: uuid(),
        status: 'success',
        title: 'OTP',
        message: `OTP отправлен Вам на ${isPhone ? 'телефон' : 'почту'}`,
        timeout: 3500
      }));
      dispatch(setIsLoading(false));
    })
    .catch((error) => {
      const { code } = error.response.data;

      dispatch(setIsLoading(false));
      if (code === 'USER_NOT_FOUND') {
        dispatch(send({
          id: uuid(),
          status: 'error',
          title: 'Error',
          message: 'Пользователь не найден',
          timeout: 3500
        }));
        dispatch(replace('/auth/signin'));
      } else {
        dispatch(send({
          id: uuid(),
          status: 'error',
          title: 'Ошибка',
          message: 'Ошибка сервера',
          timeout: 3500
        }));
      }
    });
};
