import config from './config';

export default class Topup {

  constructor(http) {
    this.http = http;
  }

  getPaymentProviders(txType, serial) {
    return this.http.post(config.GET_PAYMENT_PROVIDERS, {
      txType,
      serial
    });
  }

  calculateCommission(accountId, serial, amount, txType) {
    return this.http.post(config.CALCULATE_COMMISSION, {
      accountId,
      serial,
      amount,
      txType
    })
  }

  createTransactions(coin, amount, type, accountId, way = 'CARD') {
    return this.http.post(config.CREATE_TRANSACTION, {
      coin,
      amount,
      type,
      method: {
        accountId,
        way
      }
    })
  }

  getListPayerFields(tx) {
    return this.http.get(config.GET_LIST_PAYER_FIELDS.replace(/{tx}/, tx))
  }

  submitPayerData(tx, optionName, name, cardId) {
    return this.http.post(config.SUBMIT_PAYER_DATA.replace(/{tx}/, tx), {
      optionName,
      fields: [
        {
          name,
          value: cardId
        }
      ]
    })
  }

}
