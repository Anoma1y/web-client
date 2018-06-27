import config from './config';

export default class Coins {

  constructor(http) {
    this.http = http;
  }

  getWalletsList() {
    return this.http.get(config.GET_COINS_LIST);
  }

  getIssuersList() {
    return this.http.get(config.GET_ISSUERS_LIST)
  }

  editName(serial, name) {
    return this.http.patch(`${config.EDIT_COIN_NAME}/${serial}`, {
      name
    });
  }

  createCoin(name, issuerId, type) {
    return this.http.post(config.CREATE_COIN, {
      name,
      issuerId,
      type
    });
  }

  setCoinAsMain(serial) {
    return this.http.post(config.SET_COIN_AS_MAIN, {
      serial
    });
  }

  deleteCoin(serial) {
    return this.http.delete(`${config.DELETE_COIN}/${serial}`);
  }

  validateCoin(serial) {
    return this.http.post(config.VALIDATE_COIN, {
      serial
    });
  }

}
