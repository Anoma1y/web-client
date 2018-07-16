import {
  SET_CARD
} from './types';
import { api } from 'lib/api';

export const setCard = (card) => ({
  type: SET_CARD,
  payload: card
});

export const pullCard = (cardId) => (dispatch) => new Promise((resolve, reject) => {

  api.cards.getInfo(cardId)
    .then((data) => {

      if (data.status !== api.code.OK) return;

      const { cardInfo } = data.data;

      dispatch(setCard(cardInfo));
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});
