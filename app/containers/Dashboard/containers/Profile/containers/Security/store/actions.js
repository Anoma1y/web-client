import {
  SET_SESSION_LIST,
  SET_CHANGE_PASSWORD_IS_LOADING,
  SET_NOTIFICATION_IS_LOADING
} from './types';
import { reset as ReduxFormReset } from 'redux-form';
import { send } from 'containers/Notification/store/actions';
import { pullProfile } from 'containers/Dashboard/containers/Profile/store/actions';
import { api } from 'lib/api';
import Config from 'lib/config';
import Storage from 'lib/storage';
import uuid from 'uuid/v1';

export const setSessionList = (session = []) => ({
  type: SET_SESSION_LIST,
  payload: session,
});

export const setChangePasswordIsLoading = (isLoading = false) => ({
  type: SET_CHANGE_PASSWORD_IS_LOADING,
  payload: isLoading
});

export const setNotificationIsLoading = (isLoading = false) => ({
  type: SET_NOTIFICATION_IS_LOADING,
  payload: isLoading
});

/**
 * Экшен для изменения типов оповещений
 * @returns {function(*, *)}
 */
export const changeNotificationSend = () => (dispatch, getState) => {
  const { security } = getState().form.SecurityNotification.values;

  dispatch(setNotificationIsLoading(true));
  api.profile.changeUserNotification(security)
    .then((data) => {

      if (data.status !== 200) return;

      const { profile } = data.data;

      dispatch(pullProfile(profile));
      dispatch(setNotificationIsLoading(false));
      dispatch(send({ id: uuid(), status: 'success', title: 'Change notification', message: 'Notification was changed', timeout: 3000 }));
    })
    .catch(() => {
      dispatch(setNotificationIsLoading(false));
      dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'An error has occurred, please try again later', timeout: 3000 }));
    })
};

/**
 * Экшен для экшена смены пароля
 * @param notif - тип сообщения об операции
 * @param msg - сообщение об ошибки (Кастомная)
 * @returns {function(*)}
 */
const resetChangePassword = (notif, msg) => (dispatch) => {
  dispatch(ReduxFormReset('SecurityChangePassword'));
  dispatch(setChangePasswordIsLoading(false));
  switch (notif) {
    case 'success':
      dispatch(send({ id: uuid(), status: 'success', title: 'Change password', message: 'Password was changed', timeout: 3000 }));
      break;
    case 'error':
      dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'An error has occurred, please try again later', timeout: 3000 }));
      break;
    case 'error-response':
      dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: msg, timeout: 3000 }));
      break;
    default:
      dispatch(send({ id: uuid(), status: 'warning', title: 'Warning', message: 'Hello, it\'s me, warning', timeout: 3000 }));
  }
};

/**
 * Экшен для изменения пароля
 * Если ошибки в форме, то блокируется ввод
 * @returns {function(*=, *)}
 */
export const changePassword = () => (dispatch, getState) => {

  const {
    syncErrors,
    values: {
      current,
      newPassword
    }
  } = getState().form.SecurityChangePassword;

  if (syncErrors) {
    return;
  }

  dispatch(setChangePasswordIsLoading(true));

  api.profile.changeUserPassword(current, newPassword)
    .then((data) => {

      if (data.status !== 200) {
        dispatch(resetChangePassword('error'));
        return;
      }

      const { authorizationToken, members } = data.data;
      const tokenName = `TOKEN ${authorizationToken.token}`;

      Storage.set('session', authorizationToken);
      Storage.set('members', members);

      api.addHeader('Authorization', tokenName)
        .then(() => dispatch(resetChangePassword('success')))
        .catch(() => dispatch(resetChangePassword('error')));
    })
    .catch((error) => {
      const { code, message } = error.response.data;

      switch (code) {
        case 'INVALID_CURRENT_PASSWORD':
          dispatch(resetChangePassword('error-response', message));
          break;
        default:
          dispatch(resetChangePassword('error'));
          break;
      }

    });
};

/**
 * Экшен для получения списка сессий в ограниченном количестве
 * @returns {function(*=): Promise<any>}
 */
export const pullSession = () => (dispatch) => new Promise((resolve, reject) => {
  api.profile.getLimitedSessionList(Config.SESSION_ENTRIES_COUNT)
    .then((data) => {
      if (data.status !== 200) return;

      const { loginHistory } = data.data;

      dispatch(setSessionList(loginHistory));
      resolve();
    })
    .catch(() => {
      reject();
    });
});
