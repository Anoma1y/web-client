import {
  SET_OTP_IS_SEND,
  SET_OTP_IS_BLOCKED,
  SET_OTP_IS_LOADING,
  RESET
} from './types';
import { replace } from 'react-router-redux';
import { send } from 'containers/Notification/store/actions';
import { pullProfile } from '../../../store/actions';
import { RESET_ALL } from 'store/reducers';
import {
  pullProfile as pullProfileMain,
  setNotification as setNotificationMain
} from 'containers/Dashboard/store/actions';
import { api } from 'lib/api';
import uuid from 'uuid/v1';
import Storage from 'lib/storage';

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

export const reset = () => ({ type: RESET });

/**
 * Экшен для отправки запроса на изменения почты/телефона
 * @param type - почта или телефон
 * @returns {function(*, *)}
 */
export const updateUserContactRequest = (type) => (dispatch, getState) => {
  const {
    values: {
      contact
    },
    syncErrors
  } = getState().form.ProfileAccount;

  if (syncErrors) return;

  let login = contact[type].toLowerCase();

  dispatch(setOTPisLoading(true));

  if (type === 'phoneNumber') {
    login = login.replace(/\+/g, '');
  }

  api.profile.updateContactRequest(login)
    .then((data) => {
      if (data.status !== api.code.OK) return;

      const { action } = data.data;
      const message = `${action === 'EMAIL_SENT' ? 'Email' : 'SMS code'} was sent`;

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
    })
    .finally(() => dispatch(setOTPisLoading(false)));
};

/**
 * Экшен для подтверждения логина (телефона/почты)
 * @param type - тип подтверждаемого типа телефон/почта
 * @returns {function(*, *)}
 */
export const updateUserContactConfirm = (type) => (dispatch, getState) => {
  const {
    form: {
      ProfileAccount: {
        values: {
          contact
        }
      }
    }
  } = getState();

  if (!contact || !contact.otp || contact.otp.length === 0) {
    dispatch(send({ id: uuid(), status: 'warning', title: 'Warning', message: 'Entering OTP', timeout: 3000 }));
    return;
  }

  let login = contact[type].toLowerCase();

  if (type === 'phoneNumber') {
    login = login.replace(/\+/g, '');
  }

  dispatch(setOTPisLoading(type, true));
  api.profile.updateContactConfirm(login, contact.otp)
    .then((data) => {

      if (data.status !== api.code.OK) return;

      const { profile } = data.data;

      dispatch(pullProfile(profile));
      dispatch(pullProfileMain(profile));
      dispatch(setNotificationMain(''));
      dispatch(setOTPisSend(type, false));
      dispatch(send({ id: uuid(), status: 'success', title: 'Success', message: 'Account was verified', timeout: 3000 }));
    })
    .catch((error) => {
      const { code, message } = error.response.data;

      switch (code) {
        case 'USER_NOT_ACTIVE':
          Storage.clear();
          api.removeHeader('Authorization');
          dispatch({ type: RESET_ALL });
          dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'The OTP was entered incorrectly. Account was temporarily suspended', timeout: 7000 }));
          dispatch(replace('/auth/signin'));
          break;
        case 'CONFIRMATION_CODE_INVALID':
          dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: `${message} If the number of attempts expires, the account will be temporarily suspended!`, timeout: 3000 }));
          break;
        default:
          dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'An error has occurred, please try again later', timeout: 3000 }));
      }
    })
    .finally(() => dispatch(setOTPisLoading(type, false)));

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
    .catch((error) => {
      const { code, message } = error.response.data;

      if (code === 'USER_NOT_FOUND') {
        dispatch(send({ id: uuid(), status: 'error', title: 'Error', message, timeout: 3000 }));
      } else {
        dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'An error has occurred, please try again later', timeout: 3000 }));
      }
    })
    .finally(() => dispatch(setOTPisLoading(type, false)));
};
