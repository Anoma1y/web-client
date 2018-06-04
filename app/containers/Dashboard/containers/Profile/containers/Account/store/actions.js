import {
  SET_OTP_IS_SEND,
  SET_OTP_IS_BLOCKED,
  SET_OTP_IS_LOADING,
  CHANGE_OTP,
  RESET
} from './types';
import { send } from 'containers/Notification/store/actions';
import { api } from 'lib/api';
import uuid from 'uuid/v1';

export const changeOTP = (contactType, value) => ({
  type: CHANGE_OTP,
  payload: {
    contactType,
    value
  }
});

export const setOTPisLoading = (contactType, isLoading = false) => ({
  type: SET_OTP_IS_LOADING,
  payload: {
    contactType,
    isLoading
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
  const { contact } = getState().ProfileAccount.values;
  let login = contact[type];
  dispatch(setOTPisSend(type, true));
  dispatch(setOTPisLoading(true));

  if (type === 'phontNumber') {
    login = login.replact(/\+/g, '');
  }

  api.profile.updateContactRequest(login)
    .then((data) => {
      dispatch(setOTPisLoading(false));
      if (data.status !== 200) {
        return;
      }

      const { action } = data.data;
      const message = `${action === 'EMAIL_SENT' ? 'Email' : 'Sms code'} was sent`;
      dispatch(send({ id: uuid(), status: 'info', title: 'Information', message, timeout: 3000 }));

    })
    .catch((error) => {
      const { code, message } = error.response.data;
      switch (code) {
        case 'USER_EMAIL_ALREADY_VERIFIED':
          dispatch(send({ id: uuid(), status: 'error', title: 'Error', message, timeout: 3000 }));
          break;
        default:
          dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'An error has occurred, please try again later', timeout: 3000 }));
      }
      dispatch(setOTPisLoading(false));
    });

};

export const updateUserContactConfirm = (type) => (dispatch, getState) => {

};

export const updateUserContactResendOTP = (type) => (dispatch, getState) => {
  dispatch(blockedResendOTP(type, true));
};
