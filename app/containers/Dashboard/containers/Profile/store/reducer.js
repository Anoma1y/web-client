import {
  SET_PROFILE,
  SET_DOCUMENTS,
  SET_DOCUMENT_TYPES,
  CHANGE_USED_TYPES,
  RESET
} from './types';

const INITIAL_STATE = {
  profile: {},
  documentTypes: [],
};

const HANDLERS = {
  [SET_PROFILE]: (state, { payload }) => ({
    ...state,
    profile: payload
  }),
  [SET_DOCUMENT_TYPES]: (state, { payload }) => ({
    ...state,
    documentTypes: payload
  }),
  [CHANGE_USED_TYPES]: (state, { payload }) => ({
    ...state,
    usedTypes: payload
  }),
  [RESET]: (state) => ({
    ...state,
    ...INITIAL_STATE
  }),
}

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);

