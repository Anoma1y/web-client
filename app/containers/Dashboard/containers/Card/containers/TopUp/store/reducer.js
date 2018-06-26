import {
  SET_WALLET,
  SET_TXTYPE
} from './types';

const INITIAL_STATE = {
  txType: '',
  wallet: {},
  providers: [],
  transaction: {},
  payerFields: [],
  isLoading: false
};

const HANDLERS = {
  [SET_TXTYPE]: (state, { payload }) => ({
    ...state,
    txType: payload
  }),
  [SET_WALLET]: (state, { payload }) => ({
    ...state,
    wallet: payload
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
