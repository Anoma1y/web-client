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
} from './types';
import { api } from 'lib/api';
import { checkIsPhone } from 'lib/auth';

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

export const getOTP = () => (dispatch, getState) => {
  const { login, role, isError } = getState().Auth_Signup;

  if (isError) {
    return;
  }
  dispatch(setIsLoading(true));
  if (checkIsPhone(login)) {
    dispatch(setIsPhone(true));
    api.auth.registration(login, role)
      .then((data) => {
        console.log('get', data)
        dispatch(setOtpIsSend(true));
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        // TODO Добавить вывод ошибки
        dispatch(setIsLoading(false));
        console.log(error);
      })

  } else {
    dispatch(setIsPhone(false));
    api.auth.registration(login, role)
      .then(() => {
        dispatch(setOtpIsSend(true));
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        dispatch(setIsLoading(false));
        console.log(error);
      });
  }
};

export const resendOTP = () => (dispatch, getState) => {
  const { login, resendOTPIsBlocked, isError } = getState().Auth_Signup;
  dispatch(changeOTP(''));
  if (resendOTPIsBlocked || isError) {
    return;
  }
  dispatch(setIsLoading(true));
  dispatch(blockedResendOTP(true));
  api.auth.registrationResendOTP(login)
    .then(() => {
      dispatch(setIsLoading(false));
    })
    .catch((error) => {
      dispatch(setIsLoading(false));
      console.log(error);
    });
};

export const sendConfirm = () => (dispatch, getState) => {
  const { login, isError, OTP } = getState().Auth_Signup;

  if (isError) {
    return;
  }

  api.auth.registrationConfirm(login, OTP)
    .then((data) => {
      dispatch(changeOTP(''));
      dispatch(setIsLoading(false));
      console.log('confirm', data);
    })
    .catch((error) => {
      dispatch(setIsLoading(false));
      console.log(error);
    });
};
