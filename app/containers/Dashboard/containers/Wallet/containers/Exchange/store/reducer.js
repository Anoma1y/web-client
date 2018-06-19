import {
  SET_COINS,
  CHANGE_COIN,
  CHANGE_AMOUNT,
  SET_ISSUER_ID
} from './types';

const INITIAL_STATE = {
  coins: [],
  outCoin: '',
  amount: '',
  issuer: {
    inIssuerId: '',
    outIssuerId: ''
  }
};

const HANDLERS = {
  [SET_COINS]: (state, { payload }) => ({
    ...state,
    coins: payload
  }),
  [CHANGE_COIN]: (state, { payload }) => ({
    ...state,
    outCoin: payload
  }),
  [CHANGE_AMOUNT]: (state, { payload }) => ({
    ...state,
    amount: payload
  }),
  [SET_ISSUER_ID]: (state, { payload }) => ({
    ...state,
    issuer: payload
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
