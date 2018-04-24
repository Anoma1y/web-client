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

    this.user = new ExampleApiModule(this.http);
  }
}

export const api: Api = new Api();
