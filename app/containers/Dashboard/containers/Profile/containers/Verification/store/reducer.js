import {
  ADD_PERSON_PHOTO,
  REMOVE_PERSON_PHOTO,
  ADD_ENTITY_DOCUMENT_FILE,
  REMOVE_ENTITY_DOCUMENT_FILE,
  SET_PERSON_PHOTO_IS_LOADING,
  SET_ENTITY_DOCUMENT_IS_LOADING,
  RESET,
} from './types';

const INITIAL_STATE = {
  personalPhoto: {},
  personalPhotoIsLoading: false,
  entityDocument: [],
  entityDocumentIsLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PERSON_PHOTO:
      return { ...state, personalPhoto: action.payload };
    case REMOVE_PERSON_PHOTO:
      return { ...state, personalPhoto: {} };
    case ADD_ENTITY_DOCUMENT_FILE:
      return {
        ...state, entityDocument: [...state.entityDocument, action.payload]
      };
    case REMOVE_ENTITY_DOCUMENT_FILE:
      return {
        ...state, entityDocument: state.entityDocument.filter((file) => file.file.id !== action.payload)
      };
    case SET_PERSON_PHOTO_IS_LOADING:
      return { ...state, personalPhotoIsLoading: action.payload };
    case SET_ENTITY_DOCUMENT_IS_LOADING:
      return { ...state, entityDocumentIsLoading: action.payload };
    default:
      return state;
  }
};
