import {
  SET_PROFILE,
  SET_DOCUMENTS,
  SET_DOCUMENT_TYPES,
  CHANGE_USED_TYPES,
  RESET
} from './types';
import { api } from 'lib/api';

export const setProfile = (value) => ({
  type: SET_PROFILE,
  payload: value,
});

export const setDocuments = (value) => ({
  type: SET_DOCUMENTS,
  payload: value,
});

export const setDocumentTypes = (types) => ({
  type: SET_DOCUMENT_TYPES,
  payload: types,
});

export const changeUsedType = (types) => ({
  type: CHANGE_USED_TYPES,
  payload: types
});

export const reset = () => ({
  type: RESET
});

export const pullDocumentTypeList = () => (dispatch) => new Promise((resolve, reject) => {
  api.profile.getAllDocumentsType()
    .then((data) => {
      if (data.status !== 200) return;

      const { documentTypes } = data.data;
      const types = documentTypes.map((item) => item.type);

      dispatch(setDocumentTypes(types));
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
});

export const pullDocuments = () => (dispatch) => new Promise((resolve, reject) => {
  api.profile.getProfileDocuments()
    .then((data) => {
      if (data.status !== 200) return;

      const { documents } = data.data;
      const usedTypes = documents.map((item) => item.type);

      dispatch(changeUsedType(usedTypes)); // todo test action, need smth do
      dispatch(setDocuments(documents));
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
});

export const pullProfile = () => (dispatch) => new Promise((resolve, reject) => {
  api.profile.getProfile()
    .then((data) => {
      if (data.status !== 200) return;

      const { profile } = data.data;

      dispatch(setProfile(profile));
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
});
