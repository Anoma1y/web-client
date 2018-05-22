import {
  CHANGE_LOGIN,
  SET_IS_PHONE,
  SET_IS_LOADING,
  CHANGE_OTP,
  SET_OTP_IS_SEND,
  SET_RESEND_OTP_BLOCKED,
  RESET,
  SET_ERROR
} from './types';
import { api } from 'lib/api';

export const changeLogin = (val) => ({
  type: CHANGE_LOGIN,
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
 * Экшен для повторной отправки ОТП
 * При активации экшена (в независимости от результата) блочиться кнопка повторной отправки
 * @returns {function(*, *)}
 */
export const resendOTP = () => (dispatch, getState) => {
  const { login, resendOTPIsBlocked, isError } = getState().Auth_Reset;

  dispatch(changeOTP(''));

  if (resendOTPIsBlocked) {
    return;
  }

  dispatch(setIsLoading(true));
  dispatch(blockedResendOTP(true));
  setTimeout(() => {
    dispatch(setIsLoading(false));
  }, 1500)
  // api.auth.registrationResendOTP(login)
  //   .then(() => {
  //     dispatch(setIsLoading(false));
  //   })
  //   .catch((error) => {
  //     dispatch(setIsLoading(false));
  //     console.log(error);
  //   });
};
