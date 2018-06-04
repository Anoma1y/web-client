import {
  SET_SESSION_LIST,
} from './types';
import { api } from 'lib/api';

export const setSessionList = (session = []) => ({
  type: SET_SESSION_LIST,
  payload: session,
});

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
