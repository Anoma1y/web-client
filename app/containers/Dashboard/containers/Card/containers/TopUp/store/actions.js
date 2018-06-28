import {
  CHANGE_AMOUNT,
  SET_WALLET,
  SET_TXTYPE,
  SET_PROVIDERS,
  SET_PROVIDER,
  SET_COMMISSION,
  SET_TRANSACTION,
  SET_PAYER_FIELDS,
  SET_IS_LOADING,
  RESET,
  RESET_TOPUP
} from './types';
import { send } from 'containers/Notification/store/actions';
import { api } from 'lib/api';
import uuid from 'uuid/v1';
import _ from 'lodash';

export const changeAmount = (value) => ({
  type: CHANGE_AMOUNT,
  payload: value,
});

export const setWallet = (wallet) => ({
  type: SET_WALLET,
  payload: wallet,
});

export const setTXtype = (txType) => ({
  type: SET_TXTYPE,
  payload: txType,
});

export const setProviders = (value) => ({
  type: SET_PROVIDERS,
  payload: value,
});

export const setProvider = (value) => ({
  type: SET_PROVIDER,
  payload: value,
});

export const setCommission = (value) => ({
  type: SET_COMMISSION,
  payload: value,
});

export const setTransaction = (value) => ({
  type: SET_TRANSACTION,
  payload: value,
});

export const setPayerFields = (value) => ({
  type: SET_PAYER_FIELDS,
  payload: value,
});

export const setIsLoading = (isLoading = false) => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

/**
 * Сброс всех значений, кроме тех, которые получены с помощью API
 * @returns {{type}}
 */
export const resetTopup = () => ({ type: RESET_TOPUP });

/**
 * Сброс всех значений на INITIAL_STATE
 * @returns {{type}}
 */
export const reset = () => ({ type: RESET });

/**
 * Экшен для получения списка кошельков с валютой карты
 * @param cardId - id карты
 * @returns {function(*=, *): Promise<any>}
 */
export const pullWallets = (cardId) => (dispatch, getState) => new Promise((resolve, reject) => {
  const { cards } = getState().Dashboard_Main;
  const currentCard = _.find(cards, { card: { id: cardId } });

  api.coins.getWalletsList()
    .then((data) => {
      if (data.status !== 200) reject();

      const { coins: wallets } = data.data;
      const wallet = _.find(wallets, { issuer: { currency: currentCard.card.currency } });

      dispatch(setWallet(wallet));
      resolve();
    })
    .catch((err) => reject(err));
});

export const calculateCommission = () => (dispatch, getState) => new Promise((resolve, reject) => {
  const {
    provider,
    amount,
    wallet,
    txType
  } = getState().Card_TopUp;

  dispatch(setIsLoading(true));
  api.topup.calculateCommission(provider.accountId, wallet.serial, amount, txType)
    .then((data) => {
      if (data.status !== 200) reject();

      dispatch(setCommission(data.data));
      resolve();
    })
    .catch(() => {
      dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'Error calculating commission', timeout: 3000 }));
      reject();
    })
    .finally(() => dispatch(setIsLoading(false)));
})

export const topup = () => (dispatch, getState) => new Promise((resolve, reject) => {
  const {
    txType,
    wallet,
    providers,
    commission,
    transaction,
    payerFields,
  } = getState().Card_TopUp;

  // coin, amount, type, accountId, way = 'CARD'

  // api.topup.createTransactions()

})

export const retrieveListPaymentProviders = (txType) => (dispatch, getState) => {

  const { wallet } = getState().Card_TopUp;

  dispatch(setIsLoading(true));
  dispatch(setTXtype(txType));
  api.topup.getPaymentProviders(txType, wallet.serial)
    .then((data) => {
      if (data.status !== 200) return;

      const { records } = data.data;

      dispatch(setProviders(records));
    })
    .catch(() => {

    })
    .finally(() => {
      dispatch(setIsLoading(false));
    });
}
