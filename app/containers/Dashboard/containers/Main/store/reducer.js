import {
  SET_CARDS,
  SET_CARD,
  SET_WALLETS,
  SET_WALLET,
  SET_PROFILE,
  SET_CARDS_AFTER_UPDATE,
  SET_THIRD_PARTY_CARDS,
  APPEND_CARD,
  REMOVE_WALLET,
  SET_NOTIFICATION
} from './types';

const INITIAL_STATE = {
  notification: '',
  profile: {},
  wallets: [],
  cards: [],
  thirdPartyCards: [],
}

const HANDLERS = {
  [SET_PROFILE]: (state, { payload }) => ({
    ...state,
    profile: payload
  }),
  [SET_WALLETS]: (state, { payload }) => ({
    ...state,
    wallets: payload
  }),
  [SET_WALLET]: (state, { payload }) => {
    const newWallets = [...state.wallets];
    newWallets[payload.index] = payload.wallet;

    return { ...state, wallets: newWallets };
  },
  [REMOVE_WALLET]: (state, { payload }) => {
    const newWallets = [...state.wallets].filter((item) => item.serial !== payload);

    return {
      ...state,
      wallets: newWallets
    }
  },
  [SET_CARDS]: (state, { payload }) => ({
    ...state,
    cards: payload
  }),
  [SET_CARDS_AFTER_UPDATE]: (state, { payload }) => ({
    ...state,
    cards: payload
  }),
  [APPEND_CARD]: (state, { payload }) => ({
    ...state,
    cards: [...state.cards, payload]
  }),
  [SET_THIRD_PARTY_CARDS]: (state, { payload }) => ({
    ...state,
    thirdPartyCards: payload
  }),
  [SET_NOTIFICATION]: (state, { payload }) => ({
    ...state,
    notification: payload
  }),
}

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
