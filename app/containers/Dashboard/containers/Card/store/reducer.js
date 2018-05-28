import {
  SET_COINS
} from './types';

const INITIAL_STATE = {
  coins: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_COINS:
      return { ...state, coins: action.payload };
    default:
      return state;
  }
};
