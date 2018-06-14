import { replace } from 'react-router-redux';
import {
  CHANGE_LOGIN,
  CHANGE_PASSWORD,
  CHANGE_OTP,
  SET_IS_PHONE,
  SET_IS_LOADING,
  SET_IS_BLOCKED,
  SET_OTP_IS_BLOCK,
  SET_OTP_IS_SEND,
  SET_RESEND_OTP_BLOCKED,
  SET_ERROR_MESSAGE,
  SET_ERROR,
  RESET
} from './types';
import { RESET_ALL } from 'store/reducers';
import Storage from 'lib/storage';
import { api } from 'lib/api';
import moment from 'moment';
import { checkIsPhone } from 'lib/auth';
import { clearAll } from 'containers/Notification/store/actions';

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

export const reset = () => ({
  type: RESET
});

// TODO переместить в отдельный компонент + переделать логаут
export const logout = () => (dispatch) => {
  Storage.clear();
  dispatch({ type: RESET_ALL });
  dispatch(replace('/auth/signin'));
};

export const signin = () => (dispatch, getState) => {
  const { login, password, isError } = getState().Auth_Signin;
  let authLogin = login.toLowerCase();

  dispatch(setIsLoading(true));
  dispatch(setErrorMessage(''));

  if (isError) return;

  if (checkIsPhone(login)) {
    authLogin = login.replace(/\+/g, '');
    dispatch(setIsPhone(true));
  }

  api.auth.authorization(authLogin, password)
    .then((data) => {
      const { action } = data.data;

      dispatch(setIsLoading(false));

      if (data.status !== 200) {
        Storage.clear();
        dispatch(setErrorMessage('Ошибка авторизации'));
        return;
      }

      switch (action) {
        case 'TOKEN_CREATED':
          const { authorizationToken, members } = data.data;

          Storage.set('session', authorizationToken);
          Storage.set('members', members);

          dispatch(reset());
          dispatch(clearAll());
          dispatch(replace('/dashboard/'));
          break;
        case 'OTP_SENT':
          dispatch(setOtpIsSend(true));
          break;
        default:
          dispatch(reset());
          Storage.clear();
      }

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

/**
 * Экшен для отправки ОТП
 * @returns {function(*, *)}
 */
export const sendConfirm = () => (dispatch, getState) => {
  const { login, isError, OTP } = getState().Auth_Signin;
  let authLogin = login;

  if (isError) {
    return;
  }

  dispatch(setIsLoading(true));
  dispatch(setErrorMessage(''));

  if (checkIsPhone(login)) {
    authLogin = login.replace(/\+/g, '');
    dispatch(setIsPhone(true));
  }

  api.auth.authorizationConfirm(authLogin, OTP)
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
      dispatch(clearAll());
      dispatch(replace('/dashboard/'));
    })
    .catch((error) => {
      const { code, message } = error.response.data;

      dispatch(setIsLoading(false));
      switch (code) {
        case 'CONFIRMATION_CODE_INVALID':
          dispatch(setErrorMessage(message));
          break;
        // todo добавить ошибку если ОТП устарел
        // todo в дальнешейм заменить на превышено кол-во попыток + время добавить
        case 'UNKNOWN_ERROR':
          dispatch(blockOTPsend(true));
          dispatch(setErrorMessage('Превышено количество попыток'));
          break;
        default:
          dispatch(setErrorMessage('Server error'));
      }
    });
};

/**
 * Экшен для повторной отправки ОТП
 * При активации экшена (в независимости от результата) блочиться кнопка повторной отправки
 * @returns {function(*, *)}
 */
export const resendOTP = () => (dispatch, getState) => {
  const { login, resendOTPIsBlocked, isError } = getState().Auth_Signin;
  let authLogin = login;

  dispatch(changeOTP(''));

  if (resendOTPIsBlocked || isError) {
    return;
  }

  dispatch(blockedResendOTP(true));
  dispatch(setIsLoading(true));
  dispatch(setErrorMessage(''));

  if (checkIsPhone(login)) {
    authLogin = login.replace(/\+/g, '');
    dispatch(setIsPhone(true));
  }

  api.auth.authorizationResendOTP(authLogin)
    .then((data) => {
      console.log(data)
      dispatch(setIsLoading(false));
    })
    .catch((error) => {
      const { code, message } = error.response.data;

      dispatch(setIsLoading(false));
      if (code === 'USER_NOT_FOUND') {
        dispatch(setErrorMessage(message));
      } else {
        dispatch(setErrorMessage('Server error'));
      }
    });

};
