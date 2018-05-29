import {
  SET_PROFILE,
  SET_OTP_IS_SEND,
  SET_OTP_IS_BLOCKED,
  CHANGE_OTP,
  RESET
} from './types';
import { send } from 'containers/Notification/store/actions';
import { api } from 'lib/api';
import uuid from 'uuid/v1';

export const setProfile = (value) => ({
  type: SET_PROFILE,
  payload: value,
});

export const changeOTP = (contactType, value) => ({
  type: CHANGE_OTP,
  contactType,
  payload: value
})

export const setOTPisSend = (contactType, otp = false) => ({
  type: SET_OTP_IS_SEND,
  contactType,
  payload: otp
});

export const blockedResendOTP = (contactType, blocked = false) => ({
  type: SET_OTP_IS_BLOCKED,
  contactType,
  payload: blocked
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

// todo добавить экшен для обновления данных в сайдбаре и т.п.
export const updateUserAddress = () => (dispatch, getState) => {
  const { address } = getState().form.ProfileAccount.values;
  api.profile.updateUserAddress(address)
    .then((data) => {
      if (data.status !== 200) return;

      const { profile } = data.data;

      dispatch(setProfile(profile));
      dispatch(send({ id: uuid(), status: 'success', title: 'Success', message: 'Post address has been changed', timeout: 4000 }));
    })
    .catch(() => {
      dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'An error occurred while sending data to the server', timeout: 4000 }));
    })
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
