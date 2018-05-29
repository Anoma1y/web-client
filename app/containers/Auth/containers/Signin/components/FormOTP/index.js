import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Input from 'components/Input';
import Button from 'components/Button';
import { Https as HttpsIcon } from '@material-ui/icons';
import {
  resendOTP,
  blockedResendOTP,
  sendConfirm,
  changeOTP,
  setError,
  reset
} from '../../store/actions';
import { clearAll } from 'containers/Notification/store/actions';
import { validateOTP } from 'lib/auth';

@connect(state => ({ Auth_Signin: state.Auth_Signin }), {
  resendOTP,
  blockedResendOTP,
  sendConfirm,
  changeOTP,
  setError,
  clearAll,
  reset
})
export default class FormOTP extends Component {

  state = {
    otpError: '',
    timer: 0
  };

  /**
   * После истечения 100000 мс, форма сбрасывает в начальное состояние
   */
  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.props.reset();
    }, 100000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    clearInterval(this.resendTimeout);
    this.props.clearAll();
    this.props.reset();
  }

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

    this.resendTimeout = setInterval(() => {
      if (this.state.timer === 1) {
        this.props.blockedResendOTP(false);
        clearInterval(this.resendTimeout);
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
    const { OTP } = this.props.Auth_Signin;

    const checkOTP = validateOTP(OTP);
    const checkError = checkOTP.error;

    if (checkOTP.error) {
      this.setState({
        otpError: checkOTP.errorText
      });
    }

    this.props.setError(checkError);
    return !checkError;
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

    const {
      OTP,
      otpIsBlock,
      isLoading,
      resendOTPIsBlocked,
      errorMessage
    } = this.props.Auth_Signin;

    return (
      <Fragment>
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

