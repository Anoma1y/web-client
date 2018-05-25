import {
  SET_PROFILE_INFO
} from './types';
import { api } from 'lib/api';

export const setProfile = (value) => ({
  type: SET_PROFILE_INFO,
  payload: value,
});

export const setProfileInfo = () => (dispatch) => {
  api.profile.getProfile()
    .then((data) => {
      if (data.status !== 200) return;

      dispatch(setProfile(data.data.profile));
    })
    .catch((error) => {
      console.log(error)
    })
};
