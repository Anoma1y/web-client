import {
  SET_COIN
} from './types';

const INITIAL_STATE = {
  coin: {}
};

const HANDLERS = {
  [SET_COIN]: (state, { payload }) => ({
    ...state,
    coin: payload
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
