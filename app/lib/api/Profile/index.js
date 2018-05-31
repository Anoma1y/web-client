import config from './config';

export default class Profile {

  constructor(http) {
    this.http = http;
  }

  getProfile() {
    return this.http.get(config.PROFILE_INFO);
  }

  getSessionList() {
    return this.http.get(config.PROFILE_SESSION);
  }

  /**
   *
   * @param address - объект { country, zipCode, city, street, houseNumber } - всё опционально, хотя бы 1
   * @returns {AxiosPromise<any>}
   */
  updateUserAddress(address) {
    return this.http.patch(config.PROFILE_UPDATE_USER_ADDRESS, {
      address
    });
  }

  updateContactRequest(login) {
    return this.http.post(config.PROFILE_CONTACT_REQUEST, {
      login
    });
  }

  updateContacConfirm(login, otp) {
    return this.http.post(config.PROFILE_CONTACT_CONFIRM, {
      login,
      otp
    });
  }

  updateContacResendOTP(login) {
    return this.http.post(config.PROFILE_CONTACT_RESEND, {
      login
    });
  }

  getAllDocumentsType() {
    return this.http.post(config.GET_ALL_DOCUMENTS_TYPE);
  }

  submitDocumentsUpload(fileId, type) {
    return this.http.post(config.SUBMIT_UPLOAD_DOCUNENT, {
      fileId,
      type
    });
  }

  getProfileDocuments() {
    return this.http.get(config.GET_PROFILE_DOCUMENTS);
  }
}
