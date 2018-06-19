import {
  SET_COINS,
  CHANGE_COIN_SERIAL,
  CHANGE_AMOUNT,
  SET_ISSUER_ID,
  SET_IS_LOAD_RATE,
  SET_IS_LOADING,
  SET_RATES,
  RESET
} from './types';

const INITIAL_STATE = {
  coins: [],
  outCoinSerial: '',
  amount: {
    sell: 0,
    buy: 0
  },
  issuer: {
    inIssuerId: '',
    outIssuerId: ''
  },
  rates: {},
  isLoading: false,
  isLoadRate: false
};

const HANDLERS = {
  [SET_COINS]: (state, { payload }) => ({
    ...state,
    coins: payload
  }),
  [SET_IS_LOADING]: (state, { payload }) => ({
    ...state,
    isLoading: payload
  }),
  [SET_IS_LOAD_RATE]: (state, { payload }) => ({
    ...state,
    isLoadRate: payload
  }),
  [SET_RATES]: (state, { payload }) => ({
    ...state,
    rates: payload
  }),
  [CHANGE_COIN_SERIAL]: (state, { payload }) => ({
    ...state,
    outCoinSerial: payload
  }),
  [CHANGE_AMOUNT]: (state, { payload }) => ({
    ...state,
    amount: payload
  }),
  [SET_ISSUER_ID]: (state, { payload }) => ({
    ...state,
    issuer: payload
  }),
  [RESET]: (state) => ({
    ...state,
    ...INITIAL_STATE
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
