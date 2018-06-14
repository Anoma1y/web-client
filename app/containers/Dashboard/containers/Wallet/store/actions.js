import {
  SET_COIN
} from './types';
import { api } from 'lib/api';
import _ from 'lodash';

export const setCoin = (coin) => ({
  type: SET_COIN,
  payload: coin,
});

export const pullCoin = (id) => (dispatch) => new Promise((resolve, reject) => {

  api.coins.getCoinsList()
    .then((data) => {

      if (data.status !== 200) return;

      const { coins } = data.data;
      const coin = _.find(coins, { 'serial': id });

      dispatch(setCoin(coin));
      resolve();
    })
    .catch((err) => {
      reject(err);
    });

});
