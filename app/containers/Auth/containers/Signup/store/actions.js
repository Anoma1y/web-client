import {
  CHANGE_LOGIN,
  CHANGE_ROLE,
  CHANGE_COUNTRY,
  CHANGE_OTP,
  SET_IS_PHONE,
  SET_IS_LOADING,
  SET_OTP_IS_SEND,
  SET_ERROR,
} from './types';
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
  const { login, isError } = getState().Auth_Signup;

  if (isError) {
    return;
  }
  dispatch(setIsLoading(true));

  if (checkIsPhone(login)) {
    dispatch(setIsPhone(true));
    setTimeout(() => {
      dispatch(setOtpIsSend(true));
      dispatch(setIsLoading(false));

    }, 500);
  } else {
    dispatch(setIsPhone(false));
    setTimeout(() => {
      dispatch(setOtpIsSend(true));
      dispatch(setIsLoading(false));

    }, 500);
  }

};

export const resendOTP = () => (dispatch, getState) => {
  dispatch(changeOTP(''));
  dispatch(setIsLoading(true));
  setTimeout(() => { dispatch(setIsLoading(false)) }, 5000)
}

export const sendConfirm = () => (dispatch, getState) => {
  const { login, isError, OTP } = getState().Auth_Signup;

  console.log(login, OTP)
};
