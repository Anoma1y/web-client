import {
  SET_CARDS_IS_UPDATE,
  SET_THIRD_PARTY_CARDS,
  SET_NOTIFICATION,
  SET_ACTIVE,
  CHANGE_EDIT_NAME_WALLET,
  EDIT_IS_LOADING
} from './types';

const INITIAL_STATE = {
  cardsIsUpdate: false,
  editNameWallet: '',
  editIsLoading: false,
  active: {
    type: null,
    id: null
  }
};

const HANDLERS = {
  [SET_CARDS_IS_UPDATE]: (state, { payload }) => ({
    ...state,
    cardsIsUpdate: payload
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
  [CHANGE_EDIT_NAME_WALLET]: (state, { payload }) => ({
    ...state,
    editNameWallet: payload
  }),
  [EDIT_IS_LOADING]: (state, { payload }) => ({
    ...state,
    editIsLoading: payload
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
