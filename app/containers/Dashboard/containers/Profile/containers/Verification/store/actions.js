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

export const addEntityDocumentFile = (file) => ({
  type: ADD_ENTITY_DOCUMENT_FILE,
  payload: file,
});

export const removeEntityDocumentFile = (id) => ({
  type: REMOVE_ENTITY_DOCUMENT_FILE,
  payload: id,
});

export const setPersonPhotoIsLoading = (isLoading = false) => ({
  type: SET_PERSON_PHOTO_IS_LOADING,
  payload: isLoading,
});

export const setEntityDocumentIsLoading = (isLoading = false) => ({
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

export const uploadPersonFile = (fileUpload, type = 'other') => (dispatch) => {
  dispatch(setPersonPhotoIsLoading(true));
  api.media.uploadMediaFile(fileUpload)
    .then((data) => {
      if (data.status !== 200) return;

      const { file } = data.data;

      dispatch(setPersonPhotoIsLoading(false));
      dispatch(addPersonFile({ file, type }));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const uploadIdentityFile = (fileUpload, type = 'passport') => (dispatch) => {
  dispatch(setEntityDocumentIsLoading(true));
  api.media.uploadMediaFile(fileUpload)
    .then((data) => {
      if (data.status !== 200) return;

      const { file } = data.data;

      dispatch(setEntityDocumentIsLoading(false));
      dispatch(addEntityDocumentFile({ file, type }));
    })
    .catch((err) => {
      console.log(err);
    });
};

// todo добавить экшен для обновления данных в сайдбаре и т.п.
export const updateBasicIdentification = () => (dispatch, getState) => {
  // const { address } = getState().form.ProfileVerification.values;
  console.log(getState())
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

