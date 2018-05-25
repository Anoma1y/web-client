import config from './config';

export default class Transactions {

  constructor(http) {
    this.http = http;
  }

  getTransactionsList(pageSize, pageNumber, sort, filter) {
    return this.http.post(config.GET_TRANSACTIONS_LIST, {
      filter,
      sort,
      pageNumber,
      pageSize
    });
  }

}
