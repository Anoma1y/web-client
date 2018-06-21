import {
  SET_PROFILE,
  SET_COINS,
  SET_COIN,
  REMOVE_COIN,
  SET_CARDS,
  APPEND_CARD,
  SET_THIRD_PARTY_CARDS,
  SET_NOTIFICATION,
  SET_ACTIVE,
  CHANGE_EDIT_NAME,
  EDIT_IS_LOADING
} from './types';

const INITIAL_STATE = {
  profile: {},
  coins: [],
  cards: [],
  thirdPartyCards: [],
  notification: '',
  editName: '',
  editIsLoading: false,
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
  [SET_COINS]: (state, { payload }) => ({
    ...state,
    coins: payload
  }),
  [SET_COIN]: (state, { payload }) => {
    const newCoins = [...state.coins];
    newCoins[payload.index] = payload.coin;

    return { ...state, coins: newCoins };
  },
  [REMOVE_COIN]: (state, { payload }) => {
    const newCoins = [...state.coins].filter((item) => item.serial !== payload);

    return {
      ...state,
      coins: newCoins
    }
  },
  [SET_CARDS]: (state, { payload }) => ({
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
  [SET_ACTIVE]: (state, { payload }) => ({
    ...state,
    active: payload
  }),
  [CHANGE_EDIT_NAME]: (state, { payload }) => ({
    ...state,
    editName: payload
  }),
  [EDIT_IS_LOADING]: (state, { payload }) => ({
    ...state,
    editIsLoading: payload
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
