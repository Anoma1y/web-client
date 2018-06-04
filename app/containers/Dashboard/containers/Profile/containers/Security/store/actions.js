import {
  SET_SESSION_LIST,
  SET_CHANGE_PASSWORD_IS_LOADING,
} from './types';
import { api } from 'lib/api';
import { send } from 'containers/Notification/store/actions';
import { reset as ReduxFormReset } from 'redux-form';
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

      dispatch(setChangePasswordIsLoading(false));

      if (data.status !== 200) {
        dispatch(ReduxFormReset('SecurityChangePassword'));
        dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'An error has occurred, please try again later', timeout: 3000 }));
        return;
      }

      const { authorizationToken, members } = data.data;
      const tokenName = `TOKEN ${authorizationToken.token}`;

      Storage.set('session', authorizationToken);
      Storage.set('members', members);

      api.addHeader('Authorization', tokenName)
        .then(() => {
          dispatch(setChangePasswordIsLoading(false));
          dispatch(ReduxFormReset('SecurityChangePassword'));
          dispatch(send({ id: uuid(), status: 'success', title: 'Change password', message: 'Password was changed', timeout: 3000 }));
        })
        .catch((err) => {
          console.log(err)
          // todo добавить ошибку
        })
    })
    .catch(() => {

      dispatch(setChangePasswordIsLoading(false));
      dispatch(ReduxFormReset('SecurityChangePassword'));
      dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'An error has occurred, please try again later', timeout: 3000 }));

    });
};

export const pullSession = () => (dispatch) => new Promise((resolve, reject) => {
  api.profile.getSessionList()
    .then((data) => {
      if (data.status !== 200) return;

      const { loginHistory } = data.data;

      if (loginHistory.length > 10) {
        loginHistory.length = 10;
      }

      dispatch(setSessionList(loginHistory));
      resolve();
    })
    .catch(() => {
      reject();
    });
});
