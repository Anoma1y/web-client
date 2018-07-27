import {
  SET_PROFILE,
  SET_ADDRESS,
  SET_DOCUMENT_TYPES,
  CHANGE_USED_TYPES,
  RESET
} from './types';
import { api } from 'lib/api';

export const setProfile = (value) => ({
  type: SET_PROFILE,
  payload: value,
});

export const setAddress = (value) => ({
  type: SET_ADDRESS,
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

/**
 * Экшен для получения списка всех доступных типов документов
 * @returns {function(*=): Promise<any>}
 */
export const pullDocumentTypeList = () => (dispatch) => new Promise((resolve, reject) => {
  api.profile.getAllDocumentsType()
    .then((data) => {
      if (data.status !== api.code.OK) return;

      const { documentTypes } = data.data;
      const types = documentTypes
        .filter((item) => !item.optional)
        .map((item) => item.type);

      dispatch(setDocumentTypes(types));
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
});

/**
 * Экшен для получения списка уже загруженных документов пользователя
 * И заполнения массива уже загруженных типов документов
 * @returns {function(*=): Promise<any>}
 */
export const pullDocumentsType = () => (dispatch) => new Promise((resolve, reject) => {
  api.profile.getProfileDocuments()
    .then((data) => {
      if (data.status !== api.code.OK) return;

      const { documents } = data.data;
      const usedTypes = documents
        .map((item) => item.type);

      dispatch(changeUsedType(usedTypes)); // todo test action, need smth do
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
});

/**
 * Экшен для получения списка информации о пользователе
 * @returns {function(*=): Promise<any>}
 */
export const pullProfile = () => (dispatch) => new Promise((resolve, reject) => {
  api.profile.getProfile()
    .then((data) => {
      if (data.status !== api.code.OK) return;

      const { profile } = data.data;

      dispatch(setProfile(profile));
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
});

/**
 * Экшен для вызова паралленьных промисных экшенов инициализации данных
 * @returns {function(*): Promise<[any , any , any]>}
 */
export const initialData = () => (dispatch) => Promise.all([
  dispatch(pullDocumentsType()),
  dispatch(pullDocumentTypeList()),
  dispatch(pullProfile())
]);
