import config from './config';

export default class Auth {

  constructor(http) {
    this.http = http;
  }

  registration(login, role) {
    return this.http.post(config.REGISTRATION, {
      login,
      role
    });
  }

  registrationConfirm(login, otp) {
    return this.http.post(config.REGISTRATION_CONFIRM, {
      login,
      otp
    });
  }

  registrationResendOTP(login) {
    return this.http.post(config.REGISTRATION_RESEND, {
      login
    });
  }
}
