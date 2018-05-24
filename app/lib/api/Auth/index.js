import config from './config';

export default class Auth {

  constructor(http) {
    this.http = http;
  }

  registration(login, role, country) {
    return this.http.post(config.REGISTRATION, {
      login,
      role,
      country
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

  authorization(login, password) {
    return this.http.post(config.AUTHORIZATION, {
      login,
      password
    });
  }

  reset(login) {
    return this.http.post(config.RESET, {
      login
    });
  }

  resetConfirm(login, otp, newUserPassword) {
    return this.http.post(config.RESET_CONFIRM, {
      login,
      otp,
      newUserPassword
    });
  }

  resetResendOTP(login) {
    return this.http.post(config.RESET_RESEND, {
      login
    });
  }
}
