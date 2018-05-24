import axios from 'axios';
import config from './config';
import AuthApiModule from './Auth';
import ProfileApiModule from './Profile';
import CoinsApiModule from './Coins';

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
  }

  addHeader(key, value) {
    return new Promise((res) => {
      this.http.defaults.headers = {
        ...this.http.defaults.headers,
        [key]: value
      };
      res();
    });
  }

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
