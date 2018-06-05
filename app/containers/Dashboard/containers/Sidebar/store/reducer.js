import {
  SET_PROFILE,
  SET_COINS,
  SET_CARDS,
  SET_NOTIFICATION,
  SET_ACTIVE,
  SET_ISSUERS
} from './types';

const INITIAL_STATE = {
  profile: {},
  coins: [],
  cards: [],
  issuers: [],
  notification: '',
  active: {
    type: null,
    id: null
  }
};

const HANDLERS = {
  [SET_PROFILE]: (state, { payload }) => ({
    ...state,
    profile: payload
  }),
  [SET_ISSUERS]: (state, { payload }) => ({
    ...state,
    issuers: payload
  }),
  [SET_COINS]: (state, { payload }) => ({
    ...state,
    coins: payload
  }),
  [SET_CARDS]: (state, { payload }) => ({
    ...state,
    cards: payload
  }),
  [SET_NOTIFICATION]: (state, { payload }) => ({
    ...state,
    notification: payload
  }),
  [SET_ACTIVE]: (state, { payload }) => ({
    ...state,
    active: payload
  }),
}

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
