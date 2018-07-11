import {
  ADD_PERSON_PHOTO,
  REMOVE_PERSON_PHOTO,
  ADD_ENTITY_DOCUMENT_FILE,
  REMOVE_ENTITY_DOCUMENT_FILE,
  SET_PERSON_PHOTO_IS_LOADING,
  SET_ENTITY_DOCUMENT_IS_LOADING,
  SET_UPDATE_PERSON_INFO_IS_LOADING,
  SET_UPDATE_USER_ADDRESS_IS_LOADING,
  SET_UPDATE_ADDITIONAL_INFO_IS_LOADING,
} from './types';

const INITIAL_STATE = {
  personalPhoto: {},
  entityDocument: [],
  entityDocumentIsLoading: false,
  updatePersonInfoIsLoading: false,
  updateUserAddressIsLoading: false,
  updateAdditionalInfoIsLoading: false,
};

const HANDLERS = {
  [ADD_PERSON_PHOTO]: (state, { payload }) => ({
    ...state,
    personalPhoto: payload
  }),
  [REMOVE_PERSON_PHOTO]: (state) => ({
    ...state,
    personalPhoto: {}
  }),
  [ADD_ENTITY_DOCUMENT_FILE]: (state, { payload }) => ({
    ...state,
    entityDocument: payload
  }),
  [REMOVE_ENTITY_DOCUMENT_FILE]: (state, { payload }) => ({
    ...state,
    entityDocument: state.entityDocument.filter((file) => file.file.id !== payload)
  }),
  [SET_PERSON_PHOTO_IS_LOADING]: (state, { payload }) => ({
    ...state,
    personalPhotoIsLoading: payload
  }),
  [SET_ENTITY_DOCUMENT_IS_LOADING]: (state, { payload }) => ({
    ...state,
    entityDocumentIsLoading: payload
  }),
  [SET_UPDATE_PERSON_INFO_IS_LOADING]: (state, { payload }) => ({
    ...state,
    updatePersonInfoIsLoading: payload
  }),
  [SET_UPDATE_ADDITIONAL_INFO_IS_LOADING]: (state, { payload }) => ({
    ...state,
    updateAdditionalInfoIsLoading: payload
  }),
  [SET_UPDATE_USER_ADDRESS_IS_LOADING]: (state, { payload }) => ({
    ...state,
    updateUserAddressIsLoading: payload
  }),
}

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
