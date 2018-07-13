import {
  CHANGE_AMOUNT,
  SET_COMMISSION,
  SET_IS_LOADING,
  CHANGE_ACTIVE_TYPE,
  SET_TRANSACTION,
  CHANGE_COUNTRY,
  RESET,
} from './types';
import { send } from 'containers/Notification/store/actions';
import { api } from 'lib/api';
import uuid from 'uuid/v1';

export const changeAmount = (value) => ({
  type: CHANGE_AMOUNT,
  payload: value,
});

export const setIsLoading = (isLoading = false) => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

export const changeActiveType = (value) => ({
  type: CHANGE_ACTIVE_TYPE,
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

export const changeCountry = (value = null) => ({
  type: CHANGE_COUNTRY,
  payload: value,
});

export const reset = (value) => ({
  type: RESET,
  payload: value,
});

export const calculateCommission = () => (dispatch, getState) => new Promise((resolve, reject) => {
  const {
    Dashboard_Wallet: {
      coin
    },
    Wallet_Withdraw: {
      amount
    }
  } = getState();

  if (!amount || amount <= 0) return;

  dispatch(setIsLoading(true));
  api.withdraw.calculateCommission(coin.serial, amount)
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
});

export const requestToWithdraw = () => (dispatch, getState) => new Promise((resolve, reject) => {
  const {
    form: {
      WithdrawRequestForm: {
        syncErrors,
        values
      }
    },
    Wallet_Withdraw: {
      amount,
      country,
      activeType
    },
    Dashboard_Wallet: {
      coin: {
        serial
      }
    }
  } = getState();

  if (syncErrors) {
    dispatch(send({ id: uuid(), status: 'warning', title: 'Warning', message: 'Fill in required fields', timeout: 3000 }));
    return
  }

  if (!country) {
    dispatch(send({ id: uuid(), status: 'warning', title: 'Warning', message: 'Невалидный IBAN или страна не поддерживается платежной системой SEPA', timeout: 3000 }));
    return;
  }

  const BOLdata = {
    sourceIBAN: serial,
    country: country.label,
    ...values,
  };

  api.withdraw.createRequestViaBol(BOLdata)
    .then((data) => {
      if (data.status !== 200) reject();
      const { process } = data.data;

      dispatch(setTransaction(process));
      dispatch(send({ id: uuid(), status: 'success', title: 'Success', message: 'Successful withdrawal', timeout: 3000 }));
      resolve();
    })
    .catch(() => {
      dispatch(send({ id: uuid(), status: 'error', title: 'Error', message: 'Error transaction', timeout: 3000 }));
      reject();
    })
})
