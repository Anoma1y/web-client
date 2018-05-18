import {
  CHANGE_LOGIN
} from './types';

export const changeLogin = (value) => ({
  type: CHANGE_LOGIN,
  payload: value
});
