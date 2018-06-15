import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Lock as LockIcon,
  Https as HttpsIcon
} from '@material-ui/icons';
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
import CONFIG from 'lib/config';

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
   * После истечения 300000 мс (5 минут), форма сбрасывает в начальное состояние
   */
  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.props.reset();
    }, 300000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    clearInterval(this.resendTimeout);
    this.props.reset();
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

    this.setState({ timer: CONFIG.OTP_BLOCK_TIMEOUT });

    this.resendTimeout = setInterval(() => {

      if (this.state.timer === 1) {
        this.props.blockedResendOTP(false);
        clearInterval(this.resendTimeout);
      }

      this.setState({ timer: this.state.timer - 1 });

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
      otpError: checkOTP.error
        ? checkOTP.errorText
        : '',
      passwordError: checkPassword.error
        ? checkPassword.errorText
        : ''
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
    if (this.validateForm()) this.props.sendConfirm();
  };

  render() {

    const {
      newUserPassword,
      OTP,
      otpIsBlock,
      isLoading,
      resendOTPIsBlocked,
      errorMessage
    } = this.props.Auth_Reset;

    return (
      <Fragment>

        <div className={'auth-form_item'}>
          <Input
            type="text"
            placeholder={'Entering new password'}
            icon={<LockIcon color={'action'} />}
            iconPosition={'left'}
            error={this.state.passwordError}
            errorPosition={'under'}
            value={newUserPassword}
            onChange={this.handleChangeNewUserPassword}
            onBlur={this.handlePasswordBlur}
          />
        </div>

        <div className={'auth-form_item'}>
          <Input
            type="text"
            placeholder={'Entering OTP'}
            icon={<HttpsIcon color={'action'} />}
            iconPosition={'left'}
            error={this.state.otpError}
            errorPosition={'under'}
            value={OTP}
            onChange={this.handleChangeOTP}
          />
        </div>

        <div className={'auth-form_item auth-form_btn'}>
          <div className={'auth-form_inline-btn'}>
            <Button
              color={'blue'}
              onClick={this.handleSendOTP}
              disabled={otpIsBlock}
              loading={isLoading}
            >
              <span className={'auth-btn_text'}>Send OTP</span>
            </Button>
          </div>

          <div className={'auth-form_inline-btn'}>
            <Button
              color={'green'}
              disabled={resendOTPIsBlocked || otpIsBlock}
              onClick={this.handleReSendOTP}
              loading={isLoading}
            >
              <span className={'auth-btn_text'}>{resendOTPIsBlocked ? `Wait ${this.state.timer} seconds` : 'Resend OTP'} </span>
            </Button>
            {
              errorMessage !== '' &&
              <div className={'auth-form_error'}>
                <span>{errorMessage}</span>
              </div>
            }
          </div>
        </div>
      </Fragment>
    );
  }
}

