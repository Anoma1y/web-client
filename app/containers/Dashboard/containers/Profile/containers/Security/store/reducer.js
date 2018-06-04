import {
  SET_SESSION_LIST,
  SET_CHANGE_PASSWORD_IS_LOADING
} from './types';

const INITIAL_STATE = {
  session: [],
  passwordIsLoading: false
};

const HANDLERS = {
  [SET_SESSION_LIST]: (state, { payload }) => ({
    ...state,
    session: payload
  }),
  [SET_CHANGE_PASSWORD_IS_LOADING]: (state, { payload }) => ({
    ...state,
    passwordIsLoading: payload
  })
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
