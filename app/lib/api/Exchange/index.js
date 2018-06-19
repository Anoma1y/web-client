import config from './config';

export default class Exchange {

  constructor(http) {
    this.http = http;
  }

  getRates(inIssuerId, outIssuerId) {
    return this.http.post(config.GET_RATES, {
      inIssuerId,
      outIssuerId
    });
  }

  calculateCommission(rateId, inCoin, outCoin, inAmount) {
    return this.http.post(config.CALCULATE_COMMISSION.replace(/{rateId}/, rateId), {
      inCoin,
      outCoin,
      inAmount
    });
  }

  execute(rateId, inCoin, outCoin, inAmount) {
    return this.http.post(config.EXECUTE.replace(/{rateId}/, rateId), {
      inCoin,
      outCoin,
      inAmount
    });
  }
}
