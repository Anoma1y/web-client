import {
  SET_OTP_IS_SEND,
  SET_OTP_IS_BLOCKED,
  SET_OTP_IS_LOADING,
  CHANGE_OTP,
  RESET
} from './types';
import { send } from 'containers/Notification/store/actions';
import { pullProfile } from '../../../store/actions';
import { pullProfile as pullProfileSidebar } from '../../../../Sidebar/store/actions';
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
  const { contact } = getState().form.ProfileAccount.values;
  let login = contact[type];

  dispatch(setOTPisLoading(true));

  if (type === 'phoneNumber') {
    login = login.replace(/\+/g, '');
  }

  api.profile.updateContactRequest(login)
    .then((data) => {
      dispatch(setOTPisLoading(false));

      if (data.status !== 200) return;

      const { action } = data.data;
      const message = `${action === 'EMAIL_SENT' ? 'Email' : 'Sms code'} was sent`;
      dispatch(setOTPisSend(type, true));
      dispatch(send({ id: uuid(), status: 'info', title: 'Information', message, timeout: 3000 }));
    })
    .catch((error) => {
      const { code, message } = error.response.data;
      switch (code) {
        case 'USER_EMAIL_ALREADY_VERIFIED':
          dispatch(send({ id: uuid(), status: 'error', title: 'Error', message, timeout: 3000 }));
          break;
        case 'USER_ALREADY_EXISTS':
          dispatch(send({ id: uuid(), status: 'error', title: 'Error', message, timeout: 3000 }));
          break;
        default:
          dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'An error has occurred, please try again later', timeout: 3000 }));
      }

      dispatch(setOTPisSend(type, false));
      dispatch(setOTPisLoading(false));
    });

};

// todo не всегда оптравляется логин (телефон? почта??)
/**
 * Экшен для подтверждения логина (телефона/почты)
 * @param type - тип подтверждаемого типа телефон/почта
 * @returns {function(*, *)}
 */
export const updateUserContactConfirm = (type) => (dispatch, getState) => {
  const {
    Profile_Account: {
      otp
    },
    form: {
      ProfileAccount: {
        values: {
          contact
        }
      }
    }
  } = getState();
  let login = contact[type].toLowerCase();

  if (type === 'phoneNumber') {
    login = login.replace(/\+/g, '');
  }

  dispatch(setOTPisLoading(type, true));

  api.profile.updateContactConfirm(login, otp[type])
    .then((data) => {

      if (data.status !== 200) return;

      const { profile } = data.data;

      dispatch(pullProfile(profile));
      dispatch(pullProfileSidebar(profile));
      dispatch(setOTPisLoading(type, false));
      dispatch(setOTPisSend(type, false));
      dispatch(send({ id: uuid(), status: 'success', title: 'Success', message: 'Учетная запись подтверждена', timeout: 3000 }));
    })
    .catch((error) => {
      const { code, message } = error.response.data;

      dispatch(setOTPisLoading(type, false));

      switch (code) {
        case 'CONFIRMATION_CODE_INVALID':
          dispatch(send({ id: uuid(), status: 'error', title: 'Error', message, timeout: 3000 }));
          break;
        default:
          dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'An error has occurred, please try again later', timeout: 3000 }));
      }
    });

};

/**
 * Повторная отправка OTP кода
 * @param type - тип подтверждаемого типа телефон/почта
 * @returns {function(*, *)}
 */
export const updateUserContactResendOTP = (type) => (dispatch, getState) => {

  const {
    Profile_Account: {
      resendOTPIsBlocked
    },
    form: {
      ProfileAccount: {
        values: {
          contact
        }
      }
    }
  } = getState();

  let login = contact[type].toLowerCase();

  if (resendOTPIsBlocked[type]) return;

  dispatch(blockedResendOTP(type, true));
  dispatch(setOTPisLoading(type, true));

  if (type === 'phoneNumber') {
    login = login.replace(/\+/g, '');
  }

  api.profile.updateContacResendOTP(login)
    .then(() => {
      dispatch(setOTPisLoading(type, false));
    })
    .catch((error) => {
      const { code, message } = error.response.data;

      dispatch(setOTPisLoading(type, false));
      if (code === 'USER_NOT_FOUND') {
        dispatch(send({ id: uuid(), status: 'error', title: 'Error', message, timeout: 3000 }));
      } else {
        dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'An error has occurred, please try again later', timeout: 3000 }));
      }
    });
};
