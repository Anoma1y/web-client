import {
  SET_RECORDS_LIST,
  CHANGE_PAGE_NUMBER,
  CHANGE_PAGE_SIZE,
  CHANGE_TOTAL_RECORDS,
  CHANGE_TOTAL_PAGES,
} from './types';

const INITIAL_STATE = {
  pageNumber: 0,
  pageSize: 10,
  totalRecords: 0,
  totalPages: 0,
  records: [

  ],
  sort: {
    date: 'asc',
    status: 'asc',
    type: 'asc'
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_RECORDS_LIST:
      return { ...state, records: action.payload };
    case CHANGE_PAGE_NUMBER:
      return { ...state, pageNumber: action.payload };
    case CHANGE_PAGE_SIZE:
      return { ...state, pageSize: action.payload };
    case CHANGE_TOTAL_RECORDS:
      return { ...state, totalRecords: action.payload };
    case CHANGE_TOTAL_PAGES:
      return { ...state, totalPages: action.payload };
    default:
      return state;
  }
};
