import { replace } from 'react-router-redux';
import {
  CHANGE_LOGIN,
  CHANGE_ROLE,
  CHANGE_COUNTRY,
  CHANGE_OTP,
  SET_IS_PHONE,
  SET_IS_LOADING,
  SET_OTP_IS_SEND,
  SET_RESEND_OTP_BLOCKED,
  SET_ERROR,
  RESET
} from './types';
import { api } from 'lib/api';
import { checkIsPhone } from 'lib/auth';
import { send } from '../../../../Notification/store/actions';
import Storage from '../../../../../lib/storage';
import uuid from 'uuid/v1';

export const changeLogin = (login) => ({
  type: CHANGE_LOGIN,
  payload: login
});

export const changeRole = (role) => ({
  type: CHANGE_ROLE,
  payload: role
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

export const changeCountry = (country) => ({
  type: CHANGE_COUNTRY,
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

export const reset = () => ({
  type: RESET
});

/**
 * Экшен для отправки логина (и страны)? и рендер новой формы для ввода OTP
 * В зависимости что было отправлено (почта или телефон) придет код
 * @returns {function(*, *)}
 */
export const getOTP = () => (dispatch, getState) => {

  const { login, role, country, isError } = getState().Auth_Signup;
  let authLogin = login;

  if (isError) {
    return;
  }

  dispatch(setIsLoading(true));

  if (checkIsPhone(login)) {
    authLogin = login.replace(/\+/g, '');
    dispatch(setIsPhone(true));
  }

  api.auth.registration(authLogin, role, country)
    .then((data) => {
      if (data.status !== 200) return;

      dispatch(setOtpIsSend(true));
      dispatch(setIsLoading(false));
    })
    .catch((error) => {
      const { code } = error.response.data;

      dispatch(setIsLoading(false));
      if (code === 'USER_ALREADY_EXISTS') {
        dispatch(send({
          id: uuid(),
          status: 'error',
          title: 'Ошибка',
          message: 'Логин уже занят',
          timeout: 3500
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
 * Экшен для повторной отправки ОТП
 * При активации экшена (в независимости от результата) блочиться кнопка повторной отправки
 * @returns {function(*, *)}
 */
export const resendOTP = () => (dispatch, getState) => {
  const { login, resendOTPIsBlocked, isError } = getState().Auth_Signup;
  let authLogin = login;

  dispatch(changeOTP(''));

  if (resendOTPIsBlocked || isError) {
    return;
  }

  if (checkIsPhone(login)) {
    authLogin = login.replace(/\+/g, '');
    dispatch(setIsPhone(true));
  }

  dispatch(blockedResendOTP(true));
  dispatch(setIsLoading(true));
  api.auth.registrationResendOTP(authLogin)
    .then((data) => {
      console.log(data)
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

/**
 * Экшен для отправки ОТП
 * @returns {function(*, *)}
 */
export const sendConfirm = () => (dispatch, getState) => {
  const { login, isError, OTP } = getState().Auth_Signup;
  let authLogin = login;

  if (isError) {
    return;
  }

  if (checkIsPhone(login)) {
    authLogin = login.replace(/\+/g, '');
    dispatch(setIsPhone(true));
  }

  api.auth.registrationConfirm(authLogin, OTP)

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
};
