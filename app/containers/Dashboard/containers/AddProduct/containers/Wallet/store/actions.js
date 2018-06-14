import {
  CHANGE_NAME,
  CHANGE_CURRENCY,
  SET_IS_LOADING,
  SET_IS_ERROR,
  SET_ISSUERS,
  RESET
} from './types';
import { replace } from 'react-router-redux';
import { send } from 'containers/Notification/store/actions';
import { setCoins } from 'containers/Dashboard/containers/Sidebar/store/actions';
import { api } from 'lib/api';
import _ from 'lodash';
import uuid from 'uuid/v1';

export const setIssuers = (issuers) => ({
  type: SET_ISSUERS,
  payload: issuers,
});

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

/**
 * Экшен для изменения текущей валюты и добавления стандартного имени Wallet %CURRENCY%
 * @param value - id эмитента
 * @returns {function(*, *)}
 */
export const changeCurrency = (value) => (dispatch, getState) => {
  const { issuers } = getState().AddProduct_Wallet;
  const selectedIssuer = _.find(issuers, (o) => o.id === value);
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
 * Экшен для получения списка доступных валют
 * @returns {function(*=): Promise<any>}
 */
export const pullIssuers = () => (dispatch) => new Promise((resolve, reject) => {
  api.coins.getIssuersList()
    .then((data) => {
      if (data.status !== 200) reject();

      dispatch(setIssuers(data.data.records));
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
});

/**
 * Экшен для добавления нового кошелька
 * @returns {function(*=, *)}
 */
export const createWallet = () => (dispatch, getState) => {
  const {
    AddProduct_Wallet: { name, currency },
    Dashboard_Sidebar: { coins }
  } = getState();
  const TYPE = 'client'; // todo заменить на определенный

  if (currency === '' || name.length < 2) {
    dispatch(setIsError(true));
    return;
  }

  dispatch(setIsError(false));
  dispatch(setIsLoading(true));

  api.coins.getCoinsList()
    .then((data) => {
      if (data.status !== 200) return;

      // Для каждого кошелька можно только 1 валюту(?)
      if (_.some(data.data.coins, { currency: { id: currency } })) {
        dispatch(send({ id: uuid(), status: 'warning', title: 'Warning', message: 'Кошелек для указаной валюты уже существует', timeout: 4000 }));
        dispatch(setIsLoading(false));
        return;
      }

      /**
       * Добавление нового кошелька, если валюта не занята(?)
       */
      api.coins.createCoin(name, currency, TYPE)
        .then((data) => {
          if (data.status !== 200) return;

          const { coin } = data.data;
          const newCoins = [...coins, coin];

          dispatch(setCoins(newCoins));
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
            default:
              dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'Error при создании wallet', timeout: 4000 }));
          }

          dispatch(setIsLoading(false));

        });
    });
};
