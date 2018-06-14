import config from './config';

export default class Profile {

  constructor(http) {
    this.http = http;
  }

  uploadMediaFile(file) {
    return this.http.post(config.UPLOAD_MEDIA_FILE, file);
  }
}
