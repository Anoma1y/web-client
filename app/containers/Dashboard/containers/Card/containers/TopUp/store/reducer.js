import {
  CHANGE_AMOUNT,
  SET_WALLET,
  SET_TXTYPE,
  SET_PROVIDERS,
  SET_PROVIDER,
  SET_COMMISSION,
  SET_TRANSACTION,
  SET_PAYER_FIELDS,
  SET_IS_LOADING,
  RESET,
  RESET_TOPUP
} from './types';

const INITIAL_STATE = {
  amount: 0,
  txType: '',
  wallet: {},
  // step 1 (get retrieve list of payment providers)
  providers: [],
  provider: {
    accountId: ''
  },
  // step 2 (commission, no optional)
  commission: {},
  // step 3 (create transaction), step 5 (after submit transaction) and step 6 (no optional)
  transaction: {},
  // step 4 (get list of payer fields request by payment provider)
  payerFields: [],
  isLoading: false
};

const HANDLERS = {
  [CHANGE_AMOUNT]: (state, { payload }) => ({
    ...state,
    amount: payload
  }),
  [SET_TXTYPE]: (state, { payload }) => ({
    ...state,
    txType: payload
  }),
  [SET_WALLET]: (state, { payload }) => ({
    ...state,
    wallet: payload
  }),
  [SET_PROVIDERS]: (state, { payload }) => ({
    ...state,
    providers: payload
  }),
  [SET_PROVIDER]: (state, { payload }) => ({
    ...state,
    provider: payload
  }),
  [SET_COMMISSION]: (state, { payload }) => ({
    ...state,
    commission: payload
  }),
  [SET_TRANSACTION]: (state, { payload }) => ({
    ...state,
    transaction: payload
  }),
  [SET_PAYER_FIELDS]: (state, { payload }) => ({
    ...state,
    payerFields: payload
  }),
  [SET_IS_LOADING]: (state, { payload }) => ({
    ...state,
    isLoading: payload
  }),
  [RESET_TOPUP]: (state) => ({
    ...INITIAL_STATE,
    wallet: state.wallet,
  }),
  [RESET]: () => ({
    ...INITIAL_STATE
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
