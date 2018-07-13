import config from './config';

export default class Withdraw {

  constructor(http) {
    this.http = http;
  }

  createRequestViaBank(coin, amount, bankDetails) {
    return this.http.post(config.CREATE_REQUEST_BANK, {
      coin,
      amount,
      bankDetails
    });
  }

  createRequestViaBol(details) {
    return this.http.post(config.CREATE_REQUEST_BOL, {
      details
    });
  }

  calculateCommission(coin, amount) {
    return this.http.post(config.CALCULATE_COMMISSION, {
      coin,
      amount
    });
  }

}
