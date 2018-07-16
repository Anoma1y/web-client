import {
  SET_COIN,
} from './types';
import { api } from 'lib/api';
import _ from 'lodash';

export const setCoin = (coin) => ({
  type: SET_COIN,
  payload: coin,
});

export const pullCoin = (id) => (dispatch) => new Promise((resolve, reject) => {

  api.coins.getWalletsList()
    .then((data) => {

      if (data.status !== api.code.OK) return;

      const { coins } = data.data;
      const coin = _.find(coins, { 'serial': id });

      dispatch(setCoin(coin));
      resolve();
    })
    .catch((err) => {
      reject(err);
    });

});
