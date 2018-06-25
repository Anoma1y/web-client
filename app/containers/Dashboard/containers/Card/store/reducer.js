import {
  SET_CARD
} from './types';

const INITIAL_STATE = {
  card: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CARD:
      return { ...state, card: action.payload };
    default:
      return state;
  }
};
