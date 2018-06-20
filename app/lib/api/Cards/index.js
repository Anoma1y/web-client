import config from './config';

export default class Cards {

  constructor(http) {
    this.http = http;
  }

  getCardsList() {
    return this.http.get(config.GET_CARDS_LIST);
  }

  getThirdPartyCards() {
    return this.http.get(config.GET_THIRD_PARTY_CARDS);
  }

  getInfo(cardId) {
    return this.http.get(`${config.CARD_INFO}/${cardId}`)
  }

  updateState(cardId) {
    return this.http.get(`${config.UPDATE_STATE}/${cardId}`)
  }

}
