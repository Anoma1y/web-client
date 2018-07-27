import {
  SET_PROFILE,
  SET_ADDRESS,
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
  [SET_ADDRESS]: (state) => ({
    ...state,
    profile: {
      ...state.profile,
      address: {
        ...state.profile.address,
        ...state.profile.additional.rawDataForm.post_address,
      }
    }
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

