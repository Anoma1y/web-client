import {
  SET_PROFILE,
  SET_COINS,
  SET_COIN,
  SET_CARDS,
  SET_THIRD_PARTY_CARDS,
  SET_NOTIFICATION,
  SET_ACTIVE,
  SET_ISSUERS,
  CHANGE_EDIT_NAME
} from './types';

const INITIAL_STATE = {
  profile: {},
  coins: [],
  cards: [],
  thirdPartyCards: [],
  issuers: [],
  notification: '',
  editName: '',
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
  [SET_COIN]: (state, { payload }) => {
    const newCoins = [...state.coins];
    newCoins[payload.index] = payload.coin;
    return { ...state, coins: newCoins };
  },
  [SET_CARDS]: (state, { payload }) => ({
    ...state,
    cards: payload
  }),
  [SET_THIRD_PARTY_CARDS]: (state, { payload }) => ({
    ...state,
    thirdPartyCards: payload
  }),
  [SET_NOTIFICATION]: (state, { payload }) => ({
    ...state,
    notification: payload
  }),
  [SET_ACTIVE]: (state, { payload }) => ({
    ...state,
    active: payload
  }),
  [CHANGE_EDIT_NAME]: (state, { payload }) => ({
    ...state,
    editName: payload
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
