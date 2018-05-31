import {
  SET_PROFILE,
  SET_OTP_IS_SEND,
  SET_OTP_IS_BLOCKED,
  CHANGE_OTP,
  RESET
} from './types';
import { send } from 'containers/Notification/store/actions';
import { api } from 'lib/api';

export const setProfile = (value) => ({
  type: SET_PROFILE,
  payload: value,
});

export const changeOTP = (contactType, value) => ({
  type: CHANGE_OTP,
  payload: {
    contactType,
    value
  }
});

export const setOTPisSend = (contactType, otpIsSend = false) => ({
  type: SET_OTP_IS_SEND,
  payload: {
    contactType,
    otpIsSend
  }
});

export const blockedResendOTP = (contactType, blocked = false) => ({
  type: SET_OTP_IS_BLOCKED,
  payload: {
    contactType,
    blocked
  }
});

export const reset = () => ({
  type: RESET
});

/**
 * Экшен для отправки запроса на изменения почты/телефона
 * @param type - почта или телефон
 * @returns {function(*, *)}
 */
export const updateUserContactRequest = (type) => (dispatch, getState) => {
  dispatch(setOTPisSend(type, true));
};

export const updateUserContactConfirm = (type) => (dispatch, getState) => {

};

export const updateUserContactResendOTP = (type) => (dispatch, getState) => {
  dispatch(blockedResendOTP(type, true))
};

export const pullProfile = () => (dispatch) => new Promise((resolve, reject) => {
  api.profile.getProfile()
    .then((data) => {
      if (data.status !== 200) return;

      const { profile } = data.data;

      dispatch(setProfile(profile));
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
});
