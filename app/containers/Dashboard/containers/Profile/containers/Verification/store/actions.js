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
import {
  pullProfile as pullProfileMain,
} from 'containers/Dashboard/store/actions';
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

/**
 * Экшен для удаления документов
 * @param id - file.id документа, который нужно удалить из списка загружаемых на сервер
 * @returns {function(*, *)}
 */
export const removeEntityDocumentFile = (id) => (dispatch, getState) => {
  const {
    Profile_Verification: {
      entityDocument
    },
    Dashboard_Profile: {
      usedTypes
    }
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
 * Экшен для получения списка загруженных файлов
 * @returns {function(*=): Promise<any>}
 */
export const pullDocuments = () => (dispatch) => new Promise((resolve, reject) => {
  api.profile.getProfileDocuments()
    .then((data) => {

      if (data.status !== 200) return;

      const entityDocumentFile = [];
      const { documents } = data.data;

      documents.forEach((item) => {
        if (item.type === 'photo') {
          dispatch(addPersonFile(item));
        } else if (item.type.match(/passport_v/)) {
          entityDocumentFile.push(item);
        }
      });

      dispatch(addEntityDocumentFile(entityDocumentFile));
      resolve();
    })
    .catch((err) => reject(err));
})

/**
 * Экшен для загрузки файла для верификации пользователя по персональным данным (пасспорт, инн и тп)
 * @param fileUpload - загружаемый файл в формате FormData
 * @returns {function(*)}
 */
export const uploadIdentityFile = (fileUpload) => (dispatch, getState) => {
  const { documentTypes, usedTypes } = getState().Dashboard_Profile;
  const { entityDocument } = getState().Profile_Verification;

  dispatch(setEntityDocumentIsLoading(true));
  api.media.uploadMediaFile(fileUpload)
    .then((data) => {
      if (data.status !== 200) return;

      const { file } = data.data;
      /**
       * добавление уже используемыех типов в массив, чтобы типы не повторялись
       */
      const type = _.difference(documentTypes, usedTypes);
      const currentType = type[0];

      dispatch(changeUsedType([...usedTypes, currentType]));
      dispatch(setEntityDocumentIsLoading(false));
      dispatch(addEntityDocumentFile([...entityDocument, { file, type: currentType }]));
    })
    .catch(() => {
      dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'An error occurred while sending data to the server', timeout: 4000 }));
      dispatch(setEntityDocumentIsLoading(false));
    });
};

/**
 * Экшен для подтверждения загрузки документов
 * @param index - индекс в массиве
 * @returns {function(*, *)}
 */
export const submitEntityDocumentFile = (index) => (dispatch, getState) => {
  const { entityDocument } = getState().Profile_Verification;

  dispatch(setEntityDocumentIsLoading(true));
  api.profile.submitDocumentsUpload(entityDocument[index].file.id, entityDocument[index].type)
    .then((data) => {

      /**
       * подтверженный документ содержит поле status, которе позволяет отличить новое изображение от уже загруженного на сервер
       */
      const newEntityDocumentFile = [...entityDocument];
      newEntityDocumentFile[index] = data.data.document;

      dispatch(addEntityDocumentFile(newEntityDocumentFile));
      dispatch(setEntityDocumentIsLoading(false));
      dispatch(send({ id: uuid(), status: 'success', title: 'Success', message: 'User document has been uploaded', timeout: 4000 }));
    })
    .catch(() => {
      dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'An error occurred while sending data to the server', timeout: 4000 }));
      dispatch(setEntityDocumentIsLoading(false));
    })
};

/**
 * Экшен для загрузки файла - фотография пользователя
 * @param fileUpload - загружаемый файл в формате FormData
 * @returns {function(*)}
 */
export const uploadPersonFile = (fileUpload) => (dispatch) => {
  dispatch(setPersonPhotoIsLoading(true));
  api.media.uploadMediaFile(fileUpload)
    .then((data) => {
      if (data.status !== 200) return;

      const { file } = data.data;

      dispatch(setPersonPhotoIsLoading(false));
      dispatch(addPersonFile({ file, type: 'photo' }));
    })
    .catch(() => {
      dispatch(setPersonPhotoIsLoading(false));
      dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'An error occurred while sending data to the server', timeout: 4000 }))
    });
};

/**
 * Экшен для подтверждения загрузки фотографии пользователя
 * @returns {function(*, *)}
 */
export const submitPersonFile = () => (dispatch, getState) => {
  const { personalPhoto } = getState().Profile_Verification;

  dispatch(setPersonPhotoIsLoading(true));
  api.profile.submitDocumentsUpload(personalPhoto.file.id, personalPhoto.type)
    .then((data) => {
      if (data.status !== 200) return;

      const { document } = data.data;

      dispatch(addPersonFile(document));
      dispatch(setPersonPhotoIsLoading(false));
      dispatch(send({ id: uuid(), status: 'success', title: 'Success', message: 'Photo has been uploaded', timeout: 4000 }));
    })
    .catch(() => {
      dispatch(setPersonPhotoIsLoading(false));
      dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'An error occurred while sending data to the server', timeout: 4000 }))
    })
};

/**
 * Экшен для обновления почтового адреса
 * @returns {function(*=, *)}
 */
export const updateUserAddress = () => (dispatch, getState) => {

  const {
    syncErrors,
    values: {
      address
    }
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
      Promise.all([
        dispatch(pullProfile(profile)),
        dispatch(pullProfileMain(profile))
      ])
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
    values: {
      person
    }
  } = getState().form.VerificationPersonInfo;

  if (syncErrors) return;

  /**
   * Поля nameIntl заполяются на основе полей namePlain ()
   * @type {{namePlain: {middle: null}, nameIntl: {middle: *}, description: string}}
   */
  const personObject = {
    ...person,
    namePlain: {
      ...person.namePlain,
      middle: person.namePlain.middle === '' ? null : person.namePlain.middle
    },
    nameIntl: {
      ...person.namePlain,
      middle: person.namePlain.middle === '' ? null : person.namePlain.middle
    },
    description: ''
  };

  dispatch(setUpdatePersonInfoIsLoading(true));

  api.profile.updatePersonInfo(personObject)
    .then((data) => {

      if (data.status !== 200) return;

      const { profile } = data.data;

      /**
       * Промис для паралленьного добавления данных в сайдбар и в основной контейнер профайла
       */
      Promise.all([
        dispatch(pullProfile(profile)),
        dispatch(pullProfileMain(profile))
      ])
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

