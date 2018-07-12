import config from './config';

export default class Withdraw {

  constructor(http) {
    this.http = http;
  }

  createRequest(coin, amount, bankDetails) {
    return this.http.post(config.CREATE_REQUEST, {
      coin,
      amount,
      bankDetails
    });
  }

  calculateCommission(coin, amount) {
    return this.http.post(config.CALCULATE_COMMISSION, {
      coin,
      amount
    });
  }

}
