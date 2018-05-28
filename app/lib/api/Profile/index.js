import config from './config';

export default class Profile {

  constructor(http) {
    this.http = http;
  }

  getProfile() {
    return this.http.get(config.PROFILE_INFO);
  }

}
