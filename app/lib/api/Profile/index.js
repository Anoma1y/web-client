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

  getLimitedSessionList(limit = 5) {
    return this.http.get(`${config.PROFILE_SESSION_LIMITED}/${limit}`);
  };

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

  updatePersonInfo(person) {
    return this.http.patch(config.PROFILE_UPDATE_PERSON_INFO, {
      person
    })
  }

  updateAdditionalInfo(additional) {
    return this.http.patch(config.PROFILE_UPDATE_ADDITIONAL_INFO, {
      additional
    })
  }

  updateContactRequest(login) {
    return this.http.post(config.PROFILE_CONTACT_REQUEST, {
      login
    });
  }

  updateContactConfirm(login, otp) {
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

  changeUserPassword(currentUserPassword, newUserPassword) {
    return this.http.patch(config.CHANGE_USER_PASSWORD, {
      currentUserPassword,
      newUserPassword
    });
  }

  changeUserNotification(security) {
    return this.http.patch(config.CHANGE_NOTIFICATION_SEND, {
      security
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
