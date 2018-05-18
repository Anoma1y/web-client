import * as React from 'react';
import { connect } from 'react-redux';
import Input from 'components/Input';
import Button from 'components/Button';
import { Link } from 'react-router-dom';
import SelectList from 'components/SelectList';
import countries from 'lib/countries';
import {
  changeLogin,
  changeCountry,
  changeOTP,
  setError,
  setIsPhone,
  getOTP,
  resendOTP,
  sendConfirm
} from './store/actions';
import {
  transformLoginType,
  validationEmail,
  validationPhone,
  checkIsPhone
} from 'lib/auth';
import './style.scss';
import axios from 'axios'

class Signup extends React.Component {

  state = {
    loginError: '',
    otpError: '',
  };

  /**
   * Метод для обработки ввода логина и трансформация значения в подходящий формат (телефон или почта)
   * @param e - эвент
   */
  handleChangeLogin = (e) => {
    const { value } = e.target;
    const login = transformLoginType(value);
    this.props.changeLogin(login);
  };

  /**
   * Метод для обработки ошибок после того, как пользователь уберет фокус с инпута
   */
  handleLoginBlur = () => {
    this.validateForm();
  };

  /**
   * Метод для валидации форм
   * @returns {boolean}
   */
  validateForm = () => {
    const { login } = this.props.Auth_Signup;
    let error = false;

    if (login.length === 0) {
      this.setState({ loginError: '' });
      return;
    }

    if (checkIsPhone(login)) {
      error = !validationPhone(login);
      this.setState({
        loginError: error ? 'Please enter a valid phone number' : '',
      });
    } else {
      error = !validationEmail(login);
      this.setState({
        loginError: error ? 'Please enter a valid Email' : '',
      });
    }

    this.props.setError(error);
    return !error;

  };

  handleChangeCountry = ({ value }) => {
    this.props.changeCountry(value);
  };

  handleSignUp = () => {
    if (this.props.Auth_Signup.login.length === 0) {
      this.setState({
        loginError: 'Please enter a EMail or phone number',
      });
      return;
    }
    if (this.validateForm()) {
      this.props.getOTP();
    }
  };

  handleChangeOTP = (e) => {
    const { value } = e.target;
    const otp = value.replace(/[^\d]/g, '');
    this.props.changeOTP(otp);
  };

  validateOTP = () => {
    const { OTP } = this.props.Auth_Signup;
    let error = false;
    if (OTP.length === 0) {
      this.setState({
        otpError: 'Entering OTP'
      });
      error = true;
      this.props.setError(error);
    } else {
      this.setState({
        otpError: ''
      });
      error = false;
      this.props.setError(error);
    }
    return !error;
  };

  handleSendOTP = () => {
    if (this.validateOTP()) {
      this.props.sendConfirm();
    }
  };

  handleReSendOTP = () => {
    this.props.resendOTP();
  };

  renderSignupForm = () => {
    return (
      <React.Fragment>
        <div className={'auth-form_item'}>
          <Input
            type="text"
            placeholder={'Entering EMail or phone number'}
            icon={'user'}
            iconPosition={'right'}
            error={this.state.loginError}
            errorPosition={'upper'}
            value={this.props.Auth_Signup.login}
            onChange={this.handleChangeLogin}
            onBlur={this.handleLoginBlur}
          />
        </div>

        <div className={'auth-form_item'}>
          <SelectList
            options={countries}
            onChange={this.handleChangeCountry}
          />
        </div>

        <div className={'auth-form_item auth-form_btn'}>
          <Button
            color={'blue'}
            onClick={this.handleSignUp}
            loading={this.props.Auth_Signup.isLoading}
          >
            <span className={'auth-btn_text'}>Submit</span>
          </Button>
        </div>
      </React.Fragment>
    );
  };

  renderConfirmForm = () => {
    return (
      <React.Fragment>
        <div className={'auth-form_item'}>
          <Input
            type="text"
            placeholder={'Entering OTP'}
            icon={'payment-outbox'}
            iconPosition={'right'}
            error={this.state.otpError}
            errorPosition={'upper'}
            value={this.props.Auth_Signup.OTP}
            onChange={this.handleChangeOTP}
          />
        </div>
        <div className={'auth-form_item auth-form_btn'}>
          <div className={'auth-form_inline-btn'}>
            <Button
              color={'blue'}
              onClick={this.handleSendOTP}
              loading={this.props.Auth_Signup.isLoading}
            >
              <span className={'auth-btn_text'}>Send OTP</span>
            </Button>
          </div>
          <div className={'auth-form_inline-btn'}>
            <Button
              color={'green'}
              onClick={this.handleReSendOTP}
              loading={this.props.Auth_Signup.isLoading}
            >
              <span className={'auth-btn_text'}>Resend OTP</span>
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  };

  renderSignupHeader = () => {
    return (
      <React.Fragment>
        <h1>Register</h1>
        <p>Enter your details below.</p>
      </React.Fragment>
    );
  };

  renderConfirmHeader = () => {
    return (
      <React.Fragment>
        <h1>Confirm</h1>
        <p>Please enter the One Time Password (OTP) sent to you {this.props.Auth_Signup.isPhone ? 'mobile number' : 'EMail'}. If you do not receive your OTP within 30 second, please click on the <span className={'auth-form_header__color_blue'}>Resend OTP</span> button and thi will be resent</p>
      </React.Fragment>
    );
  };

  renderFormControl = () => {
    const { otpIsSend } = this.props.Auth_Signup;
    return otpIsSend ? this.renderConfirmForm() : this.renderSignupForm();
  };

  renderHeader = () => {
    const { otpIsSend } = this.props.Auth_Signup;
    return otpIsSend ? this.renderConfirmHeader() : this.renderSignupHeader();
  };

  // TODO распихать по компонентам форму и заголовки
  render() {

    return (
      <div className={'signup auth-inner'}>

        <div className={'auth-top'}>

          <span className={'auth-top_text'}>Already have an account?</span>
          <Link className={'auth-top_link'} to={'/auth/signin/'}>Sign In</Link>

        </div>
        <form className={'auth-form'} onSubmit={(e) => e.preventDefault()}>

          <div className={'auth-form_header'}>

            {this.renderHeader()}

          </div>

          <div className={'auth-form_content'}>
            {this.renderFormControl()}
          </div>

          <div className={'auth-form_footer'}>

            <p className={'auth-footer_copyright'}>Copyright © 2018 Jago. All rights reserved.</p>

            <div className={'auth-footer_info'}>

              <span>Terms & Conditions</span>
              <span>Cookie Policy</span>

            </div>

          </div>

        </form>

      </div>
    );
  }
}

export default connect(state => ({ Auth_Signup: state.Auth_Signup }), {
  changeLogin,
  changeCountry,
  changeOTP,
  setIsPhone,
  setError,
  getOTP,
  resendOTP,
  sendConfirm
})(Signup);

