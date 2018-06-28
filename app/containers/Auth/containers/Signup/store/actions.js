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
  SET_OTP_IS_BLOCK,
  SET_ERROR_MESSAGE,
  SET_ERROR,
  RESET
} from './types';
import { api } from 'lib/api';
import { checkIsPhone } from 'lib/auth';
import Storage from 'lib/storage';

export const changeLogin = (login) => ({
  type: CHANGE_LOGIN,
  payload: login
});

export const changeRole = (role = 'individual') => ({
  type: CHANGE_ROLE,
  payload: role
});

export const setErrorMessage = (message = '') => ({
  type: SET_ERROR_MESSAGE,
  payload: message
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

export const blockOTPsend = (isBlock = false) => ({
  type: SET_OTP_IS_BLOCK,
  payload: isBlock
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
 * Экшен для отправки логина и страны и рендер новой формы для ввода OTP
 * В зависимости что было отправлено (почта или телефон) придет код
 * @returns {function(*, *)}
 */
export const getOTP = () => (dispatch, getState) => {

  const {
    login,
    role,
    country,
    isError
  } = getState().Auth_Signup;
  let authLogin = login.toLowerCase();

  if (isError) return;

  dispatch(setIsLoading(true));
  dispatch(setErrorMessage(''));

  if (checkIsPhone(login)) {
    authLogin = login.replace(/\+/g, '');
    dispatch(setIsPhone(true));
  }

  api.auth.registration(authLogin, role, country)
    .then((data) => {

      if (data.status !== 200) {
        dispatch(setErrorMessage('Server error')); // ?
        return;
      }

      dispatch(setOtpIsSend(true));
    })
    .catch((error) => {
      const { code, message } = error.response.data;

      switch (code) {
        case 'USER_ALREADY_EXISTS':
          dispatch(setErrorMessage(message));
          break;
        default:
          dispatch(setErrorMessage('Server error'));
      }

    })
    .finally(() => dispatch(setIsLoading(false)))
};

/**
 * Экшен для отправки ОТП
 * @returns {function(*, *)}
 */
export const sendConfirm = () => (dispatch, getState) => {

  const {
    login,
    isError,
    OTP
  } = getState().Auth_Signup;
  let authLogin = login.toLowerCase();

  if (isError) return;

  dispatch(setIsLoading(true));
  dispatch(setErrorMessage(''));

  if (checkIsPhone(login)) {
    authLogin = login.replace(/\+/g, '');
    dispatch(setIsPhone(true));
  }

  api.auth.registrationConfirm(authLogin, OTP)

    .then((data) => {
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

      switch (code) {
        case 'CONFIRMATION_CODE_INVALID':
          dispatch(setErrorMessage(message));
          break;
        case 'UNKNOWN_ERROR':
          dispatch(blockOTPsend(true));
          dispatch(setErrorMessage('Превышено количество попыток'));
          break;
        default:
          dispatch(setErrorMessage('Server error'));
      }
    })
    .finally(() => dispatch(setIsLoading(false)))
};

/**
 * Экшен для повторной отправки ОТП
 * При активации экшена (в независимости от результата) блочиться кнопка повторной отправки
 * @returns {function(*, *)}
 */
export const resendOTP = () => (dispatch, getState) => {
  const {
    login,
    resendOTPIsBlocked,
    isError
  } = getState().Auth_Signup;
  let authLogin = login.toLowerCase();

  dispatch(changeOTP(''));

  if (resendOTPIsBlocked || isError) return;

  dispatch(blockedResendOTP(true));
  dispatch(setIsLoading(true));
  dispatch(setErrorMessage(''));

  if (checkIsPhone(login)) {
    authLogin = login.replace(/\+/g, '');
    dispatch(setIsPhone(true));
  }

  api.auth.registrationResendOTP(authLogin)
    .then(() => {})
    .catch((error) => {
      const { code, message } = error.response.data;

      switch (code) {
        case 'USER_NOT_FOUND':
          dispatch(setErrorMessage(message));
          break;
        default:
          dispatch(setErrorMessage('Server error'));
      }
    })
    .finally(() => dispatch(setIsLoading(false)))
};
