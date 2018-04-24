import axios from 'axios';
import config from './config';
import ExampleApiModule from './Example';

class Api {
  http: axios.Axios;
  user: ExampleApiModule;

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

    this.user = new ExampleApiModule(this.http);
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

export const api: Api = new Api();
