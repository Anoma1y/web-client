import {
  ADD_PERSON_PHOTO,
  REMOVE_PERSON_PHOTO,
  ADD_ENTITY_DOCUMENT_FILE,
  REMOVE_ENTITY_DOCUMENT_FILE,
  SET_PERSON_PHOTO_IS_LOADING,
  SET_ENTITY_DOCUMENT_IS_LOADING,
  RESET
} from './types';
import { api } from 'lib/api';
import { changeUsedType } from '../../../store/actions';
import _ from 'lodash';

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

export const setPersonPhotoIsLoading = (isLoading) => ({
  type: SET_PERSON_PHOTO_IS_LOADING,
  payload: isLoading,
});

export const setEntityDocumentIsLoading = (isLoading) => ({
  type: SET_ENTITY_DOCUMENT_IS_LOADING,
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

// todo добавить экшен для обновления данных в сайдбаре и т.п.
export const updateBasicIdentification = () => (dispatch, getState) => {
  // const { address } = getState().form.ProfileVerification.values;
  console.log(getState());
  // todo добавить фио
  // api.profile.updateUserAddress(address)
  //   .then((data) => {
  //     if (data.status !== 200) return;
  //
  //     const { profile } = data.data;
  //
  //     dispatch(setProfile(profile));
  //     dispatch(send({ id: uuid(), status: 'success', title: 'Success', message: 'Post address has been changed', timeout: 4000 }));
  //   })
  //   .catch(() => {
  //     dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'An error occurred while sending data to the server', timeout: 4000 }));
  //   })
};

