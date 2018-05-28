import {
  SET_COINS
} from './types';
import { api } from 'lib/api';

export const setCoins = (coins) => ({
  type: SET_COINS,
  payload: coins
});

export const setWalletInfo = () => (dispatch) => {
  api.coins.getCoinsList()
    .then((data) => {
      dispatch(setCoins(data.data.coins));
    })
    .catch((error) => {
      console.log(error)
    })
};

