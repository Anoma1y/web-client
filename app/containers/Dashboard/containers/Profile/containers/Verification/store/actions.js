import {
  ADD_PERSON_PHOTO,
  REMOVE_PERSON_PHOTO,
  ADD_ENTITY_DOCUMENT_FILE,
  REMOVE_ENTITY_DOCUMENT_FILE,
  SET_PERSON_PHOTO_IS_LOADING,
  SET_ENTITY_DOCUMENT_IS_LOADING,
  SET_UPDATE_PERSON_INFO_IS_LOADING,
  SET_UPDATE_USER_ADDRESS_IS_LOADING,
  RESET
} from './types';
import { api } from 'lib/api';
import { changeUsedType } from '../../../store/actions';
import { send } from 'containers/Notification/store/actions';
import { pullProfile } from 'containers/Dashboard/containers/Profile/store/actions';
import { pullProfile as pullProfileSidebar } from 'containers/Dashboard/containers/Sidebar/store/actions';
import _ from 'lodash';
import uuid from 'uuid/v1';

export const addEntityDocumentFile = (file) => ({
  type: ADD_ENTITY_DOCUMENT_FILE,
  payload: file,
});

export const removeEntityFile = (id) => ({
  type: REMOVE_ENTITY_DOCUMENT_FILE,
  payload: id,
});

export const removeEntityDocumentFile = (id) => (dispatch, getState) => {
  const {
    Profile_Verification: { entityDocument },
    Dashboard_Profile: { usedTypes }
  } = getState();
  const type = _.find(entityDocument, (o) => o.file.id === id);
  const newusedTypes = usedTypes.filter((item) => item !== type.type);

  dispatch(changeUsedType(newusedTypes));
  dispatch(removeEntityFile(id));
};

export const setPersonPhotoIsLoading = (isLoading = false) => ({
  type: SET_PERSON_PHOTO_IS_LOADING,
  payload: isLoading,
});

export const setEntityDocumentIsLoading = (isLoading = false) => ({
  type: SET_ENTITY_DOCUMENT_IS_LOADING,
  payload: isLoading,
});

export const setUpdateUserAddressIsLoading = (isLoading = false) => ({
  type: SET_UPDATE_USER_ADDRESS_IS_LOADING,
  payload: isLoading,
});

export const setUpdatePersonInfoIsLoading = (isLoading = false) => ({
  type: SET_UPDATE_PERSON_INFO_IS_LOADING,
  payload: isLoading,
});

export const addPersonFile = (file) => ({
  type: ADD_PERSON_PHOTO,
  payload: file,
});

export const removePersonFile = (id) => ({
  type: REMOVE_PERSON_PHOTO,
  payload: id,
});

export const reset = () => ({
  type: RESET
});

/**
 * Экшен для загрузки файла для верификации пользователя по персональным данным (пасспорт, инн и тп)
 * @param fileUpload - загружаемый файл в формате FormData
 * @returns {function(*)}
 */
export const uploadIdentityFile = (fileUpload) => (dispatch, getState) => {
  const { documentTypes, usedTypes } = getState().Dashboard_Profile;

  dispatch(setEntityDocumentIsLoading(true));
  api.media.uploadMediaFile(fileUpload)
    .then((data) => {
      if (data.status !== 200) return;

      const { file } = data.data;

      const type = _.difference(documentTypes, usedTypes);
      const currentType = type[0];
      dispatch(changeUsedType([...usedTypes, currentType]));
      dispatch(setEntityDocumentIsLoading(false));
      dispatch(addEntityDocumentFile({
        file,
        type: currentType
      }));
    })
    .catch((err) => {
      dispatch(setEntityDocumentIsLoading(false));
    });
};

/**
 * Экшен для загрузки файла - фотография пользователя
 * @param fileUpload - загружаемый файл в формате FormData
 * @param type - тип документа из запроса
 * @returns {function(*)}
 */
export const uploadPersonFile = (fileUpload) => (dispatch) => {
  dispatch(setPersonPhotoIsLoading(true));
  api.media.uploadMediaFile(fileUpload)
    .then((data) => {
      if (data.status !== 200) return;

      const { file } = data.data;

      dispatch(setPersonPhotoIsLoading(false));
      dispatch(addPersonFile({ file, type: 'other' }));
    })
    .catch((err) => {
      dispatch(setPersonPhotoIsLoading(false));
      // todo добавить оповещение о том, что слишком большой размер
      console.log(err);
    });
};

export const updateUserAddress = () => (dispatch, getState) => {

  const {
    syncErrors,
    values: { address }
  } = getState().form.VerificationUserAddress;

  if (syncErrors) return;

  dispatch(setUpdateUserAddressIsLoading(true));

  api.profile.updateUserAddress(address)
    .then((data) => {
      if (data.status !== 200) return;

      const { profile } = data.data;

      /**
       * Промис для паралленьного добавления данных в сайдбар и в основной контейнер профайла
       */
      Promise.all([dispatch(pullProfile(profile)), dispatch(pullProfileSidebar(profile))])
        .then(() => {
          dispatch(setUpdateUserAddressIsLoading(false));
          dispatch(send({ id: uuid(), status: 'success', title: 'Success', message: 'User address has been changed', timeout: 4000 }));
        })
        .catch(() => {
          dispatch(setUpdateUserAddressIsLoading(false));
          dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'An error occurred while sending data to the server', timeout: 4000 }));
          throw new Error();
        });
    })
    .catch(() => {
      dispatch(setUpdateUserAddressIsLoading(false));
      dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'An error occurred while sending data to the server', timeout: 4000 }));
    })
};

/**
 * Экшен для обновления фио пользователя и днюху (в будущем (возможно (скорее всего (нет))
 * @returns {function(*, *)}
 */
export const updatePersonInfo = () => (dispatch, getState) => {
  const {
    syncErrors,
    values: { person }
  } = getState().form.VerificationPersonInfo;

  if (syncErrors) return;

  const personObject = {
    ...person,
    namePlain: {
      ...person.namePlain,
      middle: person.namePlain.middle === '' ? null : person.namePlain.middle
    },
    nameIntl: {
      ...person.nameIntl,
      middle: person.nameIntl.middle === '' ? null : person.nameIntl.middle
    }
  };

  dispatch(setUpdatePersonInfoIsLoading(true));

  api.profile.updatePersonInfo(personObject)
    .then((data) => {

      if (data.status !== 200) return;

      const { profile } = data.data;

      /**
       * Промис для паралленьного добавления данных в сайдбар и в основной контейнер профайла
       */
      Promise.all([dispatch(pullProfile(profile)), dispatch(pullProfileSidebar(profile))])
        .then(() => {
          dispatch(setUpdatePersonInfoIsLoading(false));
          dispatch(send({ id: uuid(), status: 'success', title: 'Success', message: 'Person info has been changed', timeout: 4000 }));
        })
        .catch(() => {
          dispatch(setUpdatePersonInfoIsLoading(false));
          dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'An error occurred while sending data to the server', timeout: 4000 }));
          throw new Error();
        });

    })
    .catch(() => {
      dispatch(setUpdatePersonInfoIsLoading(false));
      dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'An error occurred while sending data to the server', timeout: 4000 }));
    });
};

