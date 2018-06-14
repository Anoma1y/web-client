import {
  SET_ISSUERS,
  SET_IS_LOADING,
  SET_IS_ERROR,
  CHANGE_NAME,
  CHANGE_CURRENCY,
  RESET
} from './types';

const INITIAL_STATE = {
  name: '',
  currency: '',
  isLoading: false,
  isError: false,
  issuers: []
}

const HANDLERS = {
  [SET_ISSUERS]: (state, { payload }) => ({
    ...state,
    issuers: payload
  }),
  [SET_IS_LOADING]: (state, { payload }) => ({
    ...state,
    isLoading: payload
  }),
  [CHANGE_NAME]: (state, { payload }) => ({
    ...state,
    name: payload
  }),
  [CHANGE_CURRENCY]: (state, { payload }) => ({
    ...state,
    currency: payload
  }),
  [SET_IS_ERROR]: (state, { payload }) => ({
    ...state,
    isError: payload
  }),
  [RESET]: (state) => ({
    ...state,
    ...INITIAL_STATE
  }),
}

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
