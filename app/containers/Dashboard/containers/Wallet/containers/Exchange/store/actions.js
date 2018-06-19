import {
  SET_COINS,
  CHANGE_COIN,
  CHANGE_AMOUNT,
  SET_ISSUER_ID
} from './types';
import { api } from 'lib/api';

export const setCoins = (coins) => ({
  type: SET_COINS,
  payload: coins,
});

export const changeCoin = (coin) => ({
  type: CHANGE_COIN,
  payload: coin,
});

export const changeAmount = (amount) => ({
  type: CHANGE_AMOUNT,
  payload: amount,
});

export const setIssuerId = (value) => ({
  type: SET_ISSUER_ID,
  payload: value
});

export const pullCoins = (coinException) => (dispatch) => new Promise((resolve, reject) => {
  api.coins.getCoinsList()
    .then((data) => {
      if (data.status !== 200) reject();

      const { coins } = data.data;
      const exceptionCoins = coins.filter((coin) => coin.serial !== coinException);

      dispatch(setCoins(exceptionCoins));
      resolve();
    })
    .catch((err) => {
      reject(err)
    });
});

export const pullRates = () => (dispatch, getState) => new Promise((resolve, reject) => {
  const {
    Dashboard_Wallet: { coin },
    Wallet_Exchange: { coins, outCoin }
  } = getState();
  const outCoinIssuer = coins.filter((coin) => coin.serial === outCoin);
  // const inIssuerId = coin.issuer.id;
  // const outIssuerId = outCoinIssuer.issuer.id
  console.log(outCoinIssuer)
  // dispatch(setIssuerId({ inIssuerId, outIssuerId }));
  //
  // api.exchange.getRates()
  //   .then((data) => {
  //     console.log(data)
  //   })
  //   .catch(() => {
  //
  //   })
})
