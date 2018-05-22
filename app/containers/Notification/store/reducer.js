import {
  SEND_NOTIFICATION,
  REMOVE_NOTIFICATION,
  CLEAR_ALL_NOTIFICATION
} from './types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEND_NOTIFICATION:
      return [...state, action.payload];
    case REMOVE_NOTIFICATION:
      return state.filter((item) => {
        return item.id !== action.payload;
      });
    case CLEAR_ALL_NOTIFICATION:
      return [];
    default:
      return state;
  }
};
