
const INITIAL_STATE = {
  transactions: {
    pageNumber: 0,
    pageSize: 15,
    totalRecords: 0,
    totalPages: 0,
    records: []
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
