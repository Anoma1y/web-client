import {
  CHANGE_NAME,
  CHANGE_CURRENCY,
  SET_IS_LOADING,
  SET_IS_ERROR,
  SET_AVAILABLE_ISSUERS,
  RESET
} from './types';
import { replace } from 'react-router-redux';
import _ from 'lodash';
import uuid from 'uuid/v1';
import { send } from 'containers/Notification/store/actions';
import {
  setWallets as setWalletsMain
} from 'containers/Dashboard/containers/Main/store/actions';
import { api } from 'lib/api';

export const changeName = (name) => ({
  type: CHANGE_NAME,
  payload: name,
});

export const changeCurrencyName = (currency) => ({
  type: CHANGE_CURRENCY,
  payload: currency,
});

export const setIsError = (isError = false) => ({
  type: SET_IS_ERROR,
  payload: isError,
});

export const setAvailableIssuers = (value) => ({
  type: SET_AVAILABLE_ISSUERS,
  payload: value,
});

export const pullAwailableIssuers = () => (dispatch) => new Promise((resolve, reject) => {
  api.coins.getIssuersList()
    .then((issuersList) => {
      api.coins.getWalletsList()
        .then((coinsList) => {
          if (coinsList.status !== 200) reject();

          const { coins } = coinsList.data;
          const { records: issuers } = issuersList.data;

          const usedCoins = coins.map((it) => {
            return {
              sn: it.issuer.sn
            };
          });
          const availableIssuers = _.differenceBy(issuers, usedCoins, 'sn');
          const walletIsAvailable = availableIssuers.length !== 0;

          dispatch(setAvailableIssuers(availableIssuers));
          resolve(walletIsAvailable);
        });
    })
    .catch((err) => reject(err))
});

/**
 * Экшен для изменения текущей валюты
 * При каждом изменении валюты, добавляется стандартное именя кошелька: Wallet %CURRENCY%
 * @param value - id эмитента
 * @returns {function(*, *)}
 */
export const changeCurrency = (value) => (dispatch, getState) => {
  const { availableIssuers } = getState().AddProduct_Wallet;
  const selectedIssuer = _.find(availableIssuers, (o) => o.id === value);
  const walletName = `Wallet ${selectedIssuer.sn}`;

  dispatch(changeCurrencyName(value));
  dispatch(changeName(walletName));
};

export const setIsLoading = (isLoading = false) => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

export const reset = () => ({
  type: RESET
});

/**
 * Экшен для добавления нового кошелька
 * @returns {function(*=, *)}
 */
export const createWallet = () => (dispatch, getState) => {
  const {
    AddProduct_Wallet: { name, currency },
    Dashboard_Main: { wallets }
  } = getState();
  const TYPE = 'client'; // todo заменить на определенный

  if (currency === '' || name.length < 2) {
    dispatch(setIsError(true));
    return;
  }

  dispatch(setIsError(false));
  dispatch(setIsLoading(true));

  /**
   * После получения списка уже имеющихся кошельков с сервера
   * и сравнением с уже существующей валютой кошельком,
   * выполняется запрос на добавление нового кошелька
   * Для каждого кошелька можно только 1 валюту(?)
   */
  api.coins.getWalletsList()
    .then((data) => {
      if (data.status !== 200) return;

      /**
       * Добавление нового кошелька, если валюта не занята
       * Кошелек добавляется в конец, при обновлении страницы возможно
       * изменения его положения в новом массиве
       */
      api.coins.createCoin(name, currency, TYPE)
        .then((data) => {
          if (data.status !== 200) return;

          const { coin } = data.data;
          const newCoins = [...wallets, coin];

          dispatch(setWalletsMain(newCoins));
          dispatch(send({ id: uuid(), status: 'success', title: 'Success', message: 'Wallet success создан', timeout: 4000 }));
          dispatch(reset());
          dispatch(replace(`/dashboard/wallet/${coin.serial}`));
        })
        .catch((err) => {
          const { code, message } = err.response.data;

          switch (code) {
            case 'UNKNOWN_ERROR':
              dispatch(send({ id: uuid(), status: 'error', title: 'Error', message, timeout: 4000 }));
              break;
            case 'COIN_ALREADY_EXISTS':
              dispatch(send({ id: uuid(), status: 'error', title: 'Error', message, timeout: 4000 }));
              break;
            default:
              dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'Error при создании wallet', timeout: 4000 }));
          }

          dispatch(changeName(''));
          dispatch(changeCurrencyName(''));
          dispatch(setIsLoading(false));

        });
    });
};
