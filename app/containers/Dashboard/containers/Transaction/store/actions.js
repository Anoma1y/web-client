// const ff = {
//   filter: {
//     ids: [
//       'string'
//     ],
//     types: [
//       'string'
//     ],
//     statuses: [
//       'limited',
//       'pending',
//       'declined',
//       'processed',
//       'rejected',
//       'error'
//     ],
//     dateFrom: '2018-05-25T12:55:38.307Z',
//     dateTo: '2018-05-25T12:55:38.307Z',
//     coinSerials: [
//       'string'
//     ],
//     orgIds: [
//       'string'
//     ],
//     issuerIds: [
//       'string'
//     ],
//     currencyCodes: [
//       'string'
//     ],
//     requestIdentifiers: [
//       0
//     ]
//   },
//   sort: {
//     date: 'asc',
//     status: 'asc',
//     type: 'asc'
//   },
//   pageNumber: 0,
//   pageSize: 0
// };
import {
  SET_RECORDS_LIST,
  CHANGE_PAGE_NUMBER,
  CHANGE_PAGE_SIZE,
  CHANGE_TOTAL_PAGES,
  CHANGE_TOTAL_RECORDS,
  SET_APPEND_IS_LOADING,
  APPEND_RECORDS_LIST,
  SET_BLOCKED_APPEND,
  RESET
} from './types';
import { api } from 'lib/api';
import moment from 'moment';

export const setRecords = (records) => ({
  type: SET_RECORDS_LIST,
  payload: records
});

export const appendRecords = (records) => ({
  type: APPEND_RECORDS_LIST,
  payload: records,
});

export const changePageNumber = (value) => ({
  type: CHANGE_PAGE_NUMBER,
  payload: value,
});

export const changePageSize = (value) => ({
  type: CHANGE_PAGE_SIZE,
  payload: value,
});

export const reset = () => ({
  type: RESET
});

export const changeTotalPages = (value) => ({
  type: CHANGE_TOTAL_PAGES,
  payload: value,
});

export const changeTotalRecords = (value) => ({
  type: CHANGE_TOTAL_RECORDS,
  payload: value,
});

export const setBlockedAppend = (isBlocked = false) => ({
  type: SET_BLOCKED_APPEND,
  payload: isBlocked
});

export const setAppendIsLoading = (isLoading = false) => ({
  type: SET_APPEND_IS_LOADING,
  payload: isLoading
});

const sort = {
  date: 'desc',
  status: null,
  type: null
};

const types = [
  'client_transaction_transfer',
  'client_create_prepaid',
  'client_charge_prepaid',
  'merchant_payment',
  'merchant_invoice',
  'gate_charge',
  'gate_redeem',
  'gate_purchase',
  'gate_card_refund',
  'gate_card_verification',
  'exchange_transaction',
  'cash_desk_redeem',
  'cash_desk_charge',
  'payroll_charge',
  'contract_transit',
  'merchant_cashback',
  'deposit_topup',
  'deposit_profit_payment',
  'deposit_payout',
  'deposit_capitalization',
  'deposit_accruing',
  'credit_issue',
  'credit_payment',
  'bank_topup',
  'bank_redeem'
];

const statuses = [
  'limited',
  'pending',
  'declined',
  'processed',
  'rejected',
  'error'
];

export const appendTransactions = () => (dispatch, getState) => new Promise((resolve, reject) => {
  const {
    pageSize,
    pageNumber,
    blockedAppend,
    appendIsLoading,
    filter
  } = getState().Dashboard_Transaction;

  if (blockedAppend) {
    dispatch(setAppendIsLoading(false))
    return;
  }

  if (appendIsLoading) return;

  const nextPage = pageNumber + 1;
  const currentFilter = {
    ...filter,
    types,
    statuses
  };

  dispatch(setAppendIsLoading(true));
  dispatch(changePageNumber(nextPage));

  api.transactions.getTransactionsList(pageSize, nextPage, sort, currentFilter)
    .then((data) => {
      const { records } = data.data;
      if (records.length === 0) {
        dispatch(setBlockedAppend(true));
        dispatch(setAppendIsLoading(false));
        return;
      }
      dispatch(appendRecords(records));
      dispatch(setAppendIsLoading(false));
      resolve();
    })
    .catch(() => {
      reject();
      dispatch(setAppendIsLoading(false));
    });
})

// todo нужен фикс для аккаунтов, отличных от обычного пользователя
// не все транзакции содержат поля from и to
export const pullTransactions = (date) => (dispatch, getState) => new Promise((resolve, reject) => {
  const {
    pageSize,
    filter
  } = getState().Dashboard_Transaction;

  const currentFilter = {
    ...filter,
    types,
    statuses,
    dateFrom: filter.dateFrom ? filter.dateFrom : moment(date.dateStart).toISOString(),
    dateTo: filter.dateTo ? filter.dateTo : moment(date.dateEnd).toISOString()
  };

  const pageNumber = 0;

  dispatch(changePageNumber(pageNumber));
  api.transactions.getTransactionsList(pageSize, pageNumber, sort, currentFilter)
    .then((data) => {
      const { records, totalPages, totalRecords } = data.data;
      dispatch(changeTotalPages(totalPages));
      dispatch(changeTotalRecords(totalRecords));
      dispatch(setRecords(records));
      resolve()
    })
    .catch(() => {
      reject();
    });
});
