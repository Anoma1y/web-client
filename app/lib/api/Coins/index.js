import config from './config';

export default class Coins {

  constructor(http) {
    this.http = http;
  }

  getCoinsList() {
    return this.http.get(config.GET_COINS_LIST);
  }

}
