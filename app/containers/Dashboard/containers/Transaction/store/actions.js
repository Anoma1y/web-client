import {
  SET_RECORDS_LIST,
  CHANGE_PAGE_NUMBER,
  CHANGE_PAGE_SIZE,
  CHANGE_FILTER_DATE,
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

export const changeFilterDate = (start, end) => ({
  type: CHANGE_FILTER_DATE,
  payload: {
    start,
    end
  },
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

const SORT = {
  date: 'desc',
  status: null,
  type: null
};

// todo нужен фикс для аккаунтов, отличных от обычного пользователя
// не все транзакции содержат поля from и to
export const pullTransactions = (date, filterProps = {}, isUpdate = false, isAppend = false) => (dispatch, getState) => new Promise((resolve, reject) => {
  const {
    pageNumber,
    blockedAppend,
    appendIsLoading,
    filter
  } = getState().Dashboard_Transaction;

  if (blockedAppend && !isUpdate) return;

  const DATE_START = date.dateStart ? `${moment(date.dateStart).format('YYYY-MM-DDTHH:mm:ss.SSS')}Z` : filter.dateFrom;
  const DATE_END = date.dateEnd ? `${moment(date.dateEnd).format('YYYY-MM-DDTHH:mm:ss.SSS')}Z` : filter.dateTo;

  const currentFilter = {
    ...filterProps,
    dateFrom: DATE_START,
    dateTo: DATE_END
  };

  dispatch(changeFilterDate(DATE_START, DATE_END));

  let nextPage = pageNumber;

  if (appendIsLoading) return;

  if (isAppend) {
    nextPage = pageNumber + 1;
    dispatch(setAppendIsLoading(true));
    dispatch(changePageNumber(nextPage));
  }

  if (isUpdate) {
    nextPage = 0;
    dispatch(changePageNumber(nextPage));
  }

  api.transactions.getTransactionsList(10, nextPage, SORT, currentFilter)
    .then((data) => {
      const { records, totalPages, totalRecords } = data.data;

      if (isAppend) {

        if (records.length === 0) {
          dispatch(setBlockedAppend(true));
          dispatch(setAppendIsLoading(false));
          return;
        }

        dispatch(appendRecords(records));
        dispatch(setAppendIsLoading(false));
      }

      if (!isAppend) {
        dispatch(changeTotalPages(totalPages));
        dispatch(changeTotalRecords(totalRecords));
        dispatch(setRecords(records));
      }

      resolve()
    })
    .catch(() => {
      dispatch(setAppendIsLoading(false));
      reject();
    });
});
