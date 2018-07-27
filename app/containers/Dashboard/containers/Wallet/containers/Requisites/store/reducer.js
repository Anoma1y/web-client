import {
  SET_REQUISITES,
  RESET
} from './types';

const INITIAL_STATE = {
  requisites: []
};

const HANDLERS = {
  [SET_REQUISITES]: (state, { payload }) => ({
    ...state,
    requisites: payload
  }),
  [RESET]: () => ({
    ...INITIAL_STATE
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
