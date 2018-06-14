import {
  SET_RECORDS_LIST,
  CHANGE_PAGE_NUMBER,
  CHANGE_PAGE_SIZE,
  CHANGE_TOTAL_RECORDS,
  CHANGE_TOTAL_PAGES,
  CHANGE_FILTER_DATE,
  APPEND_RECORDS_LIST,
  SET_BLOCKED_APPEND,
  SET_APPEND_IS_LOADING,
  RESET
} from './types';

const INITIAL_STATE = {
  pageNumber: 0,
  pageSize: 10,
  totalRecords: 0,
  totalPages: 0,
  blockedAppend: false,
  appendIsLoading: false,
  filter: {

  },
  records: [

  ]
};

const HANDLERS = {
  [SET_RECORDS_LIST]: (state, { payload }) => ({
    ...state,
    records: payload
  }),
  [APPEND_RECORDS_LIST]: (state, { payload }) => ({
    ...state,
    records: [...state.records, ...payload]
  }),
  [SET_BLOCKED_APPEND]: (state, { payload }) => ({
    ...state,
    blockedAppend: payload
  }),
  [SET_APPEND_IS_LOADING]: (state, { payload }) => ({
    ...state,
    appendIsLoading: payload
  }),
  [CHANGE_PAGE_NUMBER]: (state, { payload }) => ({
    ...state,
    pageNumber: payload
  }),
  [CHANGE_PAGE_SIZE]: (state, { payload }) => ({
    ...state,
    pageSize: payload
  }),
  [CHANGE_TOTAL_RECORDS]: (state, { payload }) => ({
    ...state,
    totalRecords: payload
  }),
  [CHANGE_TOTAL_PAGES]: (state, { payload }) => ({
    ...state,
    totalPages: payload
  }),
  [CHANGE_FILTER_DATE]: (state, { payload }) => ({
    ...state,
    filter: {
      ...state.filter,
      dateFrom: payload.start,
      dateTo: payload.end
    }
  }),
  [RESET]: (state) => ({
    ...state,
    ...INITIAL_STATE
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
