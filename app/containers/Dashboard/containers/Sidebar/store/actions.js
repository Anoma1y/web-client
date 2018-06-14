import {
  SET_PROFILE,
  SET_COINS,
  SET_COIN,
  SET_CARDS,
  SET_THIRD_PARTY_CARDS,
  SET_NOTIFICATION,
  SET_ACTIVE,
  CHANGE_EDIT_NAME,
  EDIT_NAME_IS_LOADING
} from './types';
import { send } from 'containers/Notification/store/actions';
import { api } from 'lib/api';
import uuid from 'uuid/v1';

export const setProfile = (value) => ({
  type: SET_PROFILE,
  payload: value,
});

export const setCoins = (coins) => ({
  type: SET_COINS,
  payload: coins
});

export const setCoin = (coin, index) => ({
  type: SET_COIN,
  payload: {
    coin,
    index
  },
});

export const setNotification = (value) => ({
  type: SET_NOTIFICATION,
  payload: value
});

export const setCards = (cards) => ({
  type: SET_CARDS,
  payload: cards
});

export const setThirdPartyCards = (tCards) => ({
  type: SET_THIRD_PARTY_CARDS,
  payload: tCards,
});

export const setActive = (active = { type: null, id: null }) => ({
  type: SET_ACTIVE,
  payload: active,
});

export const changeEditName = (value) => ({
  type: CHANGE_EDIT_NAME,
  payload: value,
});

export const setEditNameIsLoading = (isLoading = false) => ({
  type: EDIT_NAME_IS_LOADING,
  payload: isLoading,
});

/**
 * Экшен для изменении имени кошелька
 * @param index - индекс массива coins, в котором распологается кошелек
 * @returns {function(*, *)}
 */
export const applyEditName = (index) => (dispatch, getState) => {
  const { editName, coins } = getState().Dashboard_Sidebar;
  const coin = coins[index];

  /**
   * Минимальная длина имени кошелька - 2 символа и старое имя не должно равняться новому
   */
  if (editName.length < 2 || coin.name === editName) return;

  dispatch(setEditNameIsLoading(true));
  api.coins.editName(coin.serial, editName)
    .then((data) => {
      if (data.status !== 200) return;

      const { coin } = data.data;
      dispatch(send({ id: uuid(), status: 'success', title: 'Success', message: 'Имя кошелька изменено', timeout: 4000 }));
      dispatch(setCoin(coin, index));
      dispatch(setEditNameIsLoading(false));
    })
    .catch(() => {
      dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'Ошибка изменения имени кошелька', timeout: 4000 }))
      dispatch(setEditNameIsLoading(false));
    });
};

/**
 * Экшен для получения списка всех доступных кошельков
 * @returns {function(*=): Promise<any>}
 */
export const pullCoins = () => (dispatch) => new Promise((resolve, reject) => {
  api.coins.getCoinsList()
    .then((data) => {
      if (data.status !== 200) reject();

      dispatch(setCoins(data.data.coins));
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

      dispatch(setThirdPartyCards(data.data.cards));
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
});

/**
 * Экшен для получения списка всех доступных карточек
 * @returns {function(*=): Promise<any>}
 */
export const pullCards = () => (dispatch) => new Promise((resolve, reject) => {
  api.cards.getCardsList()
    .then((data) => {
      if (data.status !== 200) reject();

      dispatch(setCards(data.data.records));
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
