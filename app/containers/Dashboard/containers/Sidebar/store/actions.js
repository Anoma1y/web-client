import {
  SET_PROFILE,
  SET_COINS,
  SET_COIN,
  SET_CARDS,
  SET_THIRD_PARTY_CARDS,
  SET_NOTIFICATION,
  SET_ACTIVE,
  REMOVE_COIN,
  APPEND_CARD,
  CHANGE_EDIT_NAME_WALLET,
  EDIT_IS_LOADING
} from './types';
import { replace } from 'react-router-redux';
import { send } from 'containers/Notification/store/actions';
import { api } from 'lib/api';
import uuid from 'uuid/v1';
import { getPathInfo } from 'lib/pathUtils';

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

export const deleteCoin = (serial) => ({
  type: REMOVE_COIN,
  payload: serial,
});

export const setNotification = (value) => ({
  type: SET_NOTIFICATION,
  payload: value
});

export const setCards = (cards) => ({
  type: SET_CARDS,
  payload: cards
});

export const appendCard = (card) => ({
  type: APPEND_CARD,
  payload: card,
});

export const setThirdPartyCards = (tCards) => ({
  type: SET_THIRD_PARTY_CARDS,
  payload: tCards,
});

export const setActive = (active = { type: null, id: null }) => ({
  type: SET_ACTIVE,
  payload: active,
});

export const changeEditNameWallet = (value) => ({
  type: CHANGE_EDIT_NAME_WALLET,
  payload: value,
});

export const setEditIsLoading = (isLoading = false) => ({
  type: EDIT_IS_LOADING,
  payload: isLoading,
});

export const applyRemove = (index) => (dispatch, getState) => {
  const { coins } = getState().Dashboard_Sidebar;
  const removeCoin = coins[index];
  const { serial, amount } = removeCoin;
  const currentPath = getPathInfo(getState().routing.location.pathname);
  const currentSerial = currentPath[currentPath.length - 1];

  if (amount !== 0) {
    dispatch(send({ id: uuid(), status: 'warning', title: 'Warning', message: 'Кошелек можно удалить только если баланс равен 0', timeout: 4000 }));
    return;
  }

  dispatch(setEditIsLoading(true));
  api.coins.deleteCoin(serial)
    .then((data) => {
      if (data.status !== 200) return;

      dispatch(send({ id: uuid(), status: 'success', title: 'Success', message: `Кошелек ${serial} был удален`, timeout: 4000 }));
      dispatch(deleteCoin(serial));
      dispatch(setEditIsLoading(false));

      if (currentSerial.name === serial) {
        dispatch(replace('/dashboard/'));
      }

    })
    .catch(() => {
      dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'Ошибка при удалении кошелька', timeout: 4000 }));
      dispatch(setEditIsLoading(false));
    })

}

/**
 * Экшен для изменении имени кошелька
 * @param index - индекс массива coins, в котором распологается кошелек
 * @returns {function(*, *)}
 */
export const applyEditNameWallet = (index) => (dispatch, getState) => {

  const {
    editNameWallet,
    coins
  } = getState().Dashboard_Sidebar;
  const editCoin = coins[index];
  const { serial, name } = editCoin;
  /**
   * Минимальная длина имени кошелька - 2 символа и старое имя не должно равняться новому
   */
  if (editNameWallet.length < 2 || name === editNameWallet) return;

  dispatch(setEditIsLoading(true));
  api.coins.editName(serial, editNameWallet)
    .then((data) => {
      if (data.status !== 200) return;

      const { coin } = data.data;

      dispatch(send({ id: uuid(), status: 'success', title: 'Success', message: `Имя кошелька ${serial} изменено`, timeout: 4000 }));
      dispatch(setCoin(coin, index));
      dispatch(setEditIsLoading(false));
    })
    .catch(() => {
      dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'Ошибка изменения имени кошелька', timeout: 4000 }))
      dispatch(setEditIsLoading(false));
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

      const { cards } = data.data;

      dispatch(setThirdPartyCards(cards));
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
