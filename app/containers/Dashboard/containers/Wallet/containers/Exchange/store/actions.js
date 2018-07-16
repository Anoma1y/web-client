import {
  SET_COINS,
  SET_RATES,
  CHANGE_COIN_SERIAL,
  CHANGE_AMOUNT,
  SET_IS_LOADING,
  SET_IS_LOAD_RATE,
  SET_ISSUER_ID,
  RESET
} from './types';
import { send } from 'containers/Notification/store/actions';
import { api } from 'lib/api';
import uuid from 'uuid/v1';
import _ from 'lodash';

export const setCoins = (coins) => ({
  type: SET_COINS,
  payload: coins,
});

export const setRates = (value) => ({
  type: SET_RATES,
  payload: value,
});

export const setIsLoadRate = (value) => ({
  type: SET_IS_LOAD_RATE,
  payload: value,
});

export const setIsLoading = (value) => ({
  type: SET_IS_LOADING,
  payload: value,
});

export const changeCoinSerial = (coin) => ({
  type: CHANGE_COIN_SERIAL,
  payload: coin,
});

export const changeAmount = (amount) => ({
  type: CHANGE_AMOUNT,
  payload: amount
});

export const setIssuerId = (value) => ({
  type: SET_ISSUER_ID,
  payload: value
});

export const reset = () => ({ type: RESET })

export const pullCoins = (coinException) => (dispatch) => new Promise((resolve, reject) => {
  api.coins.getWalletsList()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      const { coins } = data.data;
      const exceptionCoins = coins.filter((coin) => coin.serial !== coinException);

      dispatch(setCoins(exceptionCoins));
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

export const pullRates = (isUpdate) => (dispatch, getState) => new Promise((resolve, reject) => {
  const {
    Dashboard_Wallet: { coin },
    Wallet_Exchange: { coins, outCoinSerial }
  } = getState();
  const outCoinIssuer = _.find(coins, { serial: outCoinSerial });
  const inIssuerId = coin.issuer.id;
  const outIssuerId = outCoinIssuer.issuer.id

  dispatch(setIssuerId({ inIssuerId, outIssuerId }));

  if (!isUpdate) {
    dispatch(setIsLoadRate(false));
    dispatch(changeAmount({ sell: 0, buy: 0 }));
  } else {
    dispatch(setIsLoading(true));
  }

  api.exchange.getRates(inIssuerId, outIssuerId)
    .then((data) => {

      if (data.status !== api.code.OK) reject();

      const { records } = data.data;
      const rates = _.find(records, { direction: 'buy' }); // Обмен валют для каждого кошелька подразумевает лишь продажу этой валюты и покупку другой

      dispatch(setIsLoadRate(true));
      dispatch(setRates(rates));

      if (isUpdate) dispatch(setIsLoading(false));

      resolve(rates);
    })
    .catch(() => {
      dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'Невозможно загрузить рейты', timeout: 4000 }));
      dispatch(setIsLoading(false));
      reject();
    });
});
