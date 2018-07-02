import {
  SET_CARDS_IS_UPDATE,
  SET_ACTIVE,
  CHANGE_EDIT_NAME_WALLET,
  EDIT_IS_LOADING
} from './types';
import { replace } from 'react-router-redux';
import { send } from 'containers/Notification/store/actions';
import { api } from 'lib/api';
import {
  removeWallet as removeWalletMain,
  setWallet as setWalletMain,
  setCardsAfterUpdate as setCardsAfterUpdateMain
} from 'containers/Dashboard/store/actions';
import uuid from 'uuid/v1';
import { getPathInfo } from 'lib/pathUtils';

export const setCardIsUpdate = (isUpdate = false) => ({
  type: SET_CARDS_IS_UPDATE,
  payload: isUpdate,
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
  const { wallets } = getState().Dashboard;
  const walletRemoveData = wallets[index];
  const { serial, amount } = walletRemoveData;
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
      dispatch(removeWalletMain(serial));

      if (currentSerial.name === serial) {
        dispatch(replace('/dashboard/'));
      }

    })
    .catch(() => {
      dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'Ошибка при удалении кошелька', timeout: 4000 }));
    })
    .finally(() => dispatch(setEditIsLoading(false)));
}

/**
 * Экшен для изменении имени кошелька
 * @param index - индекс массива coins, в котором распологается кошелек
 * @returns {function(*, *)}
 */
export const applyEditNameWallet = (index) => (dispatch, getState) => {

  const {
    Dashboard: { wallets },
    Dashboard_Sidebar: { editNameWallet }
  } = getState();

  const editWallet = wallets[index];
  const { serial, name } = editWallet;
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
      dispatch(setWalletMain(coin, index));
    })
    .catch(() => {
      dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'Ошибка изменения имени кошелька', timeout: 4000 }))
    })
    .finally(() => dispatch(setEditIsLoading(false)))
};

/**
 * Экшен для обновления статуса выпуска карты
 * @param cardId - id карты
 * @param index - индекс карты в массиве
 * @returns {function(*=, *=): Promise<any>}
 */
export const updateCard = (cardId, index) => (dispatch, getState) => new Promise((resolve, reject) => {

  dispatch(setCardIsUpdate(true));
  api.cards.updateState(cardId)
    .then((data) => {
      if (data.status !== 200) reject();

      const { cards } = getState().Dashboard;
      const { cardInfo } = data.data;

      const newCards = [...cards];
      newCards[index] = cardInfo;

      dispatch(setCardsAfterUpdateMain(newCards));
      resolve();

    })
    .catch(() => {
      dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'Ошибка при обновлении статуса карты', timeout: 4000 }));
      reject();
    })
    .finally(() => dispatch(setCardIsUpdate(false)))
});

