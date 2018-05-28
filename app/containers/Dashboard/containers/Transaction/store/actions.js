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
  CHANGE_TOTAL_RECORDS
} from './types';
import { api } from 'lib/api';

export const setRecords = (records) => ({
  type: SET_RECORDS_LIST,
  payload: records
});

export const changePageNumber = (value) => ({
  type: CHANGE_PAGE_NUMBER,
  payload: value,
});

export const changePageSize = (value) => ({
  type: CHANGE_PAGE_SIZE,
  payload: value,
});

export const changeTotalPages = (value) => ({
  type: CHANGE_TOTAL_PAGES,
  payload: value,
});

export const changeTotalRecords = (value) => ({
  type: CHANGE_TOTAL_RECORDS,
  payload: value,
});

export const pullTransactions = () => (dispatch, getState) => new Promise((resolve, reject) => {
  const filter = {
    dateFrom: '2000-05-25T12:55:38.307Z',
    dateTo: '2018-05-25T12:55:38.307Z',
  }
  const { pageSize, pageNumber, sort } = getState().Dashboard_Transaction;
  api.transactions.getTransactionsList(pageSize, pageNumber, sort, filter)
    .then((data) => {
      const { records, totalPages, totalRecords } = data.data;
      dispatch(changeTotalPages(totalPages));
      dispatch(changeTotalRecords(totalRecords));
      dispatch(setRecords(records));
      resolve()
    })
    .catch((error) => {
      reject();
    })
});
