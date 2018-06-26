import {
  SET_WALLET,
  SET_TXTYPE
} from './types';
import { api } from 'lib/api';
import _ from 'lodash';

export const setWallet = (wallet) => ({
  type: SET_WALLET,
  payload: wallet,
});

export const setTXtype = (txType) => ({
  type: SET_TXTYPE,
  payload: txType,
});

export const pullWallets = () => (dispatch) => new Promise((resolve, reject) => {

  api.coins.getCoinsList()
    .then((data) => {
      if (data.status !== 200) reject();

      const { coins } = data.data;
      const wallet = _.find(coins, { issuer: { currency: 'EUR' } });

      dispatch(setWallet(wallet));
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

export const retrieveListPaymentProviders = (txType) => (dispatch, getState) => {

  const { wallet } = getState().Card_TopUp;

  dispatch(setTXtype(txType));
  api.topup.getPaymentProviders(txType, wallet.serial)
    .then((data) => {
      if (data.status !== 200) return;

      console.log(data);
    })

}
