import {
  SET_PROFILE,
  SET_COINS,
  SET_CARDS,
  SET_NOTIFICATION
} from './types';
import { api } from 'lib/api';

export const setProfile = (value) => ({
  type: SET_PROFILE,
  payload: value,
});

export const setCoins = (coins) => ({
  type: SET_COINS,
  payload: coins
});

export const setNotification = (value) => ({
  type: SET_NOTIFICATION,
  payload: value
});

export const setCards = (cards) => ({
  type: SET_CARDS,
  payload: cards
});

export const pullCoins = () => (dispatch) => new Promise((resolve, reject) => {
  api.coins.getCoinsList()
    .then((data) => {
      
      if (data.status !== 200) return;

      dispatch(setCoins(data.data.coins));
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
});

export const pullCards = () => (dispatch) => new Promise((resolve, reject) => {
  api.cards.getCardsList()
    .then((data) => {

      if (data.status !== 200) return;

      dispatch(setCards(data.data.records));
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

      const { profile, profile: { contact } } = data.data;

      if (!contact.emailVerified && !contact.phoneVerified) {
        dispatch(setNotification('Unverified account'));
      }

      dispatch(setProfile(profile));
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
});
