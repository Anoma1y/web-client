import config from './config';

export default class Cards {

  constructor(http) {
    this.http = http;
  }

  getCardsList() {
    return this.http.get(config.GET_CARDS_LIST);
  }

}
