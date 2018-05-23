import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Input from 'components/Input';
import Button from 'components/Button';
import {
  resendOTP,
  blockedResendOTP,
  sendConfirm,
  changeOTP,
  changeNewPassword,
  setError,
  reset
} from '../../store/actions';
import {
  validateOTP,
  validatePassword
} from 'lib/auth';

@connect(state => ({ Auth_Reset: state.Auth_Reset }), {
  resendOTP,
  blockedResendOTP,
  sendConfirm,
  changeOTP,
  changeNewPassword,
  setError,
  reset
})
export default class FormOTP extends Component {

  state = {
    otpError: '',
    passwordError: '',
    timer: 0
  };

  /**
   * После истечения 100000 мс, форма сбрасывает в начальное состояние
   */
  componentDidMount() {
    this.timeOut = setTimeout(() => {
      this.props.reset();
    }, 100000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut);
  }

  handleChangeNewUserPassword = (e) => {
    const { value } = e.target;
    this.props.changeNewPassword(value);
  };

  /**
   * Метод для проверки ввода ОТП только цифр
   * @param e
   */
  handleChangeOTP = (e) => {
    const { value } = e.target;
    const otp = value.replace(/[^\d]/g, '');
    this.props.changeOTP(otp);
  };

  /**
   * Метод для обработки запуска экшена для повторной отправки ОТП
   * В независимости от результата, запускается таймер, который блочит повторную отправку ОТП на 30 секунд
   */
  handleReSendOTP = () => {

    this.setState({
      timer: 30
    });

    this.time = setInterval(() => {
      if (this.state.timer === 1) {
        this.props.blockedResendOTP(false);
        clearInterval(this.time);
      }
      this.setState({
        timer: this.state.timer - 1
      });
    }, 1000);

    this.props.resendOTP();
  };

  /**
   * Метод для валидации ОТП
   * @returns {boolean}
   */
  validateForm = () => {
    const { OTP, newUserPassword } = this.props.Auth_Reset;

    const checkOTP = validateOTP(OTP);
    const checkPassword = validatePassword(newUserPassword);

    const checkError = checkOTP.error || checkPassword.error;
    this.setState({
      otpError: checkOTP.error ? checkOTP.errorText : '',
      passwordError: checkPassword.error ? checkPassword.errorText : ''
    });

    this.props.setError(checkError);
    return !checkError;
  };

  /**
   * Метод для обработки ошибок после того, как пользователь уберет фокус с инпута
   */
  handlePasswordBlur = () => {
    this.validateForm();
  };

  /**
   * Метод для отправки ОТП
   */
  handleSendOTP = () => {
    if (this.validateForm()) {
      this.props.sendConfirm();
    }
  };

  render() {
    return (
      <Fragment>
        <div className={'auth-form_item'}>
          <Input
            type="text"
            placeholder={'Entering new password'}
            icon={'lock-gray'}
            iconPosition={'left'}
            error={this.state.passwordError}
            errorPosition={'under'}
            value={this.props.Auth_Reset.newUserPassword}
            onChange={this.handleChangeNewUserPassword}
            onBlur={this.handlePasswordBlur}
          />
        </div>
        <div className={'auth-form_item'}>
          <Input
            type="text"
            placeholder={'Entering OTP'}
            icon={'payment-outbox'}
            iconPosition={'left'}
            error={this.state.otpError}
            errorPosition={'under'}
            value={this.props.Auth_Reset.OTP}
            onChange={this.handleChangeOTP}
          />
        </div>
        <div className={'auth-form_item auth-form_btn'}>
          <div className={'auth-form_inline-btn'}>
            <Button
              color={'blue'}
              onClick={this.handleSendOTP}
              loading={this.props.Auth_Reset.isLoading}
            >
              <span className={'auth-btn_text'}>Send OTP</span>
            </Button>
          </div>
          <div className={'auth-form_inline-btn'}>
            <Button
              color={'green'}
              disabled={this.props.Auth_Reset.resendOTPIsBlocked}
              onClick={this.handleReSendOTP}
              loading={this.props.Auth_Reset.isLoading}
            >
              <span className={'auth-btn_text'}>{this.props.Auth_Reset.resendOTPIsBlocked ? `Wait ${this.state.timer} seconds` : 'Resend OTP'} </span>
            </Button>
          </div>
        </div>
      </Fragment>
    );
  }
}

