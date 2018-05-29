import config from './config';

export default class Profile {

  constructor(http) {
    this.http = http;
  }

  getProfile() {
    return this.http.get(config.PROFILE_INFO);
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
}
