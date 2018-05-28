import {
  SET_PROFILE,
  SET_COINS,
  SET_CARDS,
  SET_NOTIFICATION
} from './types';

const INITIAL_STATE = {
  profile: {

  },
  coins: [],
  cards: [],
  notification: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return { ...state, profile: action.payload };
    case SET_COINS:
      return { ...state, coins: action.payload };
    case SET_CARDS:
      return { ...state, cards: action.payload };
    case SET_NOTIFICATION:
      return { ...state, notification: action.payload };
    default:
      return state;
  }
};
