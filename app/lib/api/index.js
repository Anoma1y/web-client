import axios from 'axios';
import config from './config';
import AuthApiModule from './Auth';
import ProfileApiModule from './Profile';
import CoinsApiModule from './Coins';
import CardsApiModule from './Cards';
import TransactionsApiModule from './Transactions';
import MediaApiModule from './Media';

class Api {

  constructor() {
    this.http = axios.create({
      baseURL: config.BASE_URL,
      timeout: config.TIMEOUT,
      headers: {
        ...config.HEADERS
      }
    });
    this.registerBeforeInterceptor();
    this.registerAfterInterceptor();

    this.auth = new AuthApiModule(this.http);
    this.profile = new ProfileApiModule(this.http);
    this.coins = new CoinsApiModule(this.http);
    this.cards = new CardsApiModule(this.http);
    this.transactions = new TransactionsApiModule(this.http);
    this.media = new MediaApiModule(this.http);
  }

  /**
   * Метод для добавления заголовка
   * @param key - ключ
   * @param value - значение
   * @returns {Promise<any>} - для асинхронного выполнения выполняется обещание
   */
  addHeader(key, value) {
    return new Promise((resolve) => {

      this.http.defaults.headers = {
        ...this.http.defaults.headers,
        [key]: value
      };
      resolve();

    });
  }

  /**
   * Удаление заголовка
   * @param key - заголовок
   */
  removeHeader(key) {
    if (key in this.http.defaults.headers) {
      delete this.http.defaults.headers[key];
    }
  }

  registerBeforeInterceptor() {
    this.http.interceptors.request.use(
      // Do something before request is made
      (config) => config,

      // Do something if there is something wrong with request
      (error) => Promise.reject(error)
    );
  }

  registerAfterInterceptor() {
    this.http.interceptors.response.use(
      // Do something with successful response
      (response) => response,

      // Do something with response error
      (error) => Promise.reject(error)
    );
  }
}

export const api = new Api();
