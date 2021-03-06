import {
  SET_IS_LOADING,
  CHANGE_AMOUNT,
  SET_COMMISSION,
  CHANGE_ACTIVE_TYPE,
  SET_TRANSACTION,
  CHANGE_COUNTRY,
  RESET,
} from './types';

const INITIAL_STATE = {
  isLoading: false,
  activeType: null,
  amount: 0,
  country: null,
  commission: {},
  transaction: {}
};

const HANDLERS = {
  [SET_IS_LOADING]: (state, { payload }) => ({
    ...state,
    isLoading: payload
  }),
  [CHANGE_AMOUNT]: (state, { payload }) => ({
    ...state,
    amount: payload
  }),
  [SET_COMMISSION]: (state, { payload }) => ({
    ...state,
    commission: payload
  }),
  [CHANGE_ACTIVE_TYPE]: (state, { payload }) => ({
    ...state,
    activeType: payload
  }),
  [CHANGE_COUNTRY]: (state, { payload }) => ({
    ...state,
    country: payload
  }),
  [SET_TRANSACTION]: (state, { payload }) => ({
    ...state,
    transaction: payload
  }),
  [RESET]: () => ({
    ...INITIAL_STATE
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
