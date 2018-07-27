import {
  SET_REQUISITES
} from './types';

const INITIAL_STATE = {
  requisites: []
};

const HANDLERS = {
  [SET_REQUISITES]: (state, { payload }) => ({
    ...state,
    requisites: payload
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
