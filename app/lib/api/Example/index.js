import axios from 'axios';
import config from './config';

export default class Example {
  http: axios.Axios;

  constructor(http: axios.Axios) {
    this.http = http;
  }

  getUsers() {
    return this.http.get(config.GET_ALL_USERS);
  }

  getUser(id: number) {
    return this.http.get(`${config.GET_ALL_USERS}/${id}`);
  }
}
