import {
  SET_PROFILE,
  SET_DOCUMENTS,
  SET_DOCUMENT_TYPES,
  CHANGE_USED_TYPES,
  RESET,
} from './types';

const INITIAL_STATE = {
  profile: {},
  documents: [],
  documentTypes: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return { ...state, profile: action.payload };
    case SET_DOCUMENTS:
      return { ...state, documents: action.payload };
    case SET_DOCUMENT_TYPES:
      return { ...state, documentTypes: action.payload };
    case CHANGE_USED_TYPES:
      return { ...state, usedTypes: action.payload };
    default:
      return state;
  }
}
// [action.payload.type]: null
