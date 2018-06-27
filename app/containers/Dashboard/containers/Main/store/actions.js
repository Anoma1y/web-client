import {
  SET_CARDS,
  SET_CARD,
  SET_WALLETS,
  SET_WALLET,
  SET_PROFILE,
  SET_CARDS_AFTER_UPDATE,
  SET_THIRD_PARTY_CARDS,
  APPEND_CARD,
  REMOVE_WALLET,
  SET_NOTIFICATION
} from './types';
import { api } from 'lib/api';

export const setWallets = (wallets) => ({
  type: SET_WALLETS,
  payload: wallets,
});

export const setCards = (cards) => ({
  type: SET_CARDS,
  payload: cards
});

export const setCard = (card) => ({
  type: SET_CARD,
  payload: card,
});

export const setNotification = (value) => ({
  type: SET_NOTIFICATION,
  payload: value,
});

export const setWallet = (wallet, index) => ({
  type: SET_WALLET,
  payload: {
    wallet,
    index
  },
});

export const setProfile = (value) => ({
  type: SET_PROFILE,
  payload: value,
});

export const removeWallet = (serial) => ({
  type: REMOVE_WALLET,
  payload: serial,
});

export const setCardsAfterUpdate = (cards) => ({
  type: SET_CARDS_AFTER_UPDATE,
  payload: cards,
});

export const appendCard = (card) => ({
  type: APPEND_CARD,
  payload: card,
});

export const setThirdPartyCards = (tCards) => ({
  type: SET_THIRD_PARTY_CARDS,
  payload: tCards,
});

/**
 * Экшен для получения списка всех доступных кошельков
 * @returns {function(*=): Promise<any>}
 */
export const pullWallets = () => (dispatch) => new Promise((resolve, reject) => {
  api.coins.getWalletsList()
    .then((data) => {
      if (data.status !== 200) reject();

      dispatch(setWallets(data.data.coins));
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
});

/**
 * Экшен для получения списка всех карточек (со статусами)
 * @returns {function(*=): Promise<any>}
 */
export const pullThirdPartyCards = () => (dispatch) => new Promise((resolve, reject) => {
  api.cards.getThirdPartyCards()
    .then((data) => {
      if (data.status !== 200) reject();

      const { cards } = data.data;

      dispatch(setThirdPartyCards(cards));
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
});

/**
 * Экшен для получения карты по id - карты
 * @param cardId - id карты
 * @returns {function(*=): Promise<any>}
 */
export const pullCard = (cardId) => (dispatch) => new Promise((resolve, reject) => {

  api.cards.getInfo(cardId)
    .then((data) => {
      if (data.status !== 200) reject();

      const { cardInfo } = data.data;

      dispatch(appendCard(cardInfo));
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
});

/**
 * Экшен для получения всех данных о профайле пользователя
 * @returns {function(*=): Promise<any>}
 */
export const pullProfile = () => (dispatch) => new Promise((resolve, reject) => {
  api.profile.getProfile()
    .then((data) => {

      if (data.status !== 200) reject();

      const {
        profile,
        profile: {
          contact
        }
      } = data.data;

      if (!(contact.emailVerified && contact.phoneVerified)) {
        dispatch(setNotification('Unverified account'));
      }

      dispatch(setProfile(profile));
      resolve();
    })
    .catch((error) => {
      reject(error);
    });

});
