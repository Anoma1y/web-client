import {
  CHANGE_OTP,
  CHANGE_LOGIN,
  CHANGE_NEW_USER_PASSWORD,
  SET_ERROR,
  SET_IS_PHONE,
  SET_IS_LOADING,
  SET_OTP_IS_SEND,
  SET_ERROR_MESSAGE,
  SET_RESEND_OTP_BLOCKED,
  SET_OTP_IS_BLOCK,
  RESET,
} from './types';
import { replace } from 'react-router-redux';
import { api } from 'lib/api';
import { checkIsPhone } from 'lib/auth';
import Storage from 'lib/storage';

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

export const setErrorMessage = (message = '') => ({
  type: SET_ERROR_MESSAGE,
  payload: message
});

export const setIsPhone = (isPhone = false) => ({
  type: SET_IS_PHONE,
  payload: isPhone
});

export const setIsLoading = (isLoading = false) => ({
  type: SET_IS_LOADING,
  payload: isLoading
});

export const blockOTPsend = (isBlock = false) => ({
  type: SET_OTP_IS_BLOCK,
  payload: isBlock
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

  const {
    login,
    isError
  } = getState().Auth_Reset;
  let authLogin = login;

  if (isError) return;

  dispatch(setIsLoading(true));
  dispatch(setErrorMessage(''));

  if (checkIsPhone(login)) {

    authLogin = login.replace(/\+/g, '');
    dispatch(setIsPhone(true));

  }

  api.auth.reset(authLogin)
    .then((data) => {

      if (data.status !== 200) {
        dispatch(setErrorMessage('Server error')); // ?, upd 15.06.18: чо не понятно?
        return;
      }

      dispatch(setOtpIsSend(true));
    })
    .catch((error) => {
      const { code, message } = error.response.data;

      dispatch(changeLogin(''));

      if (code === 'LOGIN_CREDENTIAL_NOT_FOUND') {
        dispatch(setErrorMessage(message));
      } else {
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
    newUserPassword,
    OTP,
    isError
  } = getState().Auth_Reset;
  let authLogin = login.toLowerCase();

  if (isError) return;

  dispatch(setErrorMessage(''));
  dispatch(setIsLoading(true));

  if (checkIsPhone(login)) {
    authLogin = login.replace(/\+/g, '');
    dispatch(setIsPhone(true));
  }

  api.auth.resetConfirm(authLogin, OTP, newUserPassword)
    .then((data) => {

      if (data.status !== 200) {
        Storage.clear();
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
        case 'LOGIN_CREDENTIAL_NOT_FOUND':
          dispatch(setErrorMessage(message));
          break;
        case 'CONFIRMATION_CODE_INVALID':
          dispatch(setErrorMessage(message));
          break;
        case 'USER_NOT_ACTIVE':
          dispatch(blockOTPsend(true));
          dispatch(setErrorMessage('Аккаунт временно заблокирован'));
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
  } = getState().Auth_Reset;
  let authLogin = login;

  if (resendOTPIsBlocked || isError) return;

  dispatch(changeOTP(''));
  dispatch(setIsLoading(true));
  dispatch(blockedResendOTP(true));
  dispatch(setErrorMessage(''));

  if (checkIsPhone(login)) {
    authLogin = login.replace(/\+/g, '');
    dispatch(setIsPhone(true));
  }

  api.auth.resetResendOTP(authLogin)
    .then(() => {})
    .catch((error) => {
      const { code, message } = error.response.data;

      switch (code) {
        case 'CONFIRMATION_CODE_NOT_FOUND':
          dispatch(setErrorMessage(message));
          break;
        case 'USER_NOT_FOUND':
          dispatch(setErrorMessage(message));
          dispatch(replace('/auth/signin'));
          break;
        default:
          dispatch(setErrorMessage('Server error'));
      }
    })
    .finally(() => dispatch(setIsLoading(false)))
};
