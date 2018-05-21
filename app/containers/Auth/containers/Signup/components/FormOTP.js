import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Input from 'components/Input';
import Button from 'components/Button';
import {
  resendOTP,
  blockedResendOTP,
  sendConfirm,
  changeOTP,
  setError
} from '../store/actions';

class FormOTP extends Component {

  state = {
    otpError: '',
    timer: 0
  };

  handleChangeOTP = (e) => {
    const { value } = e.target;
    const otp = value.replace(/[^\d]/g, '');
    this.props.changeOTP(otp);
  };

  handleReSendOTP = () => {
    this.setState({
      timer: 30
    })
    this.time = setInterval(() => {
      if (this.state.timer === 1) {
        this.props.blockedResendOTP(false);
        clearInterval(this.time);
      }
      this.setState({
        timer: this.state.timer - 1
      });
    }, 1000)
    this.props.resendOTP();
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
  render() {
    return (
      <Fragment>
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
              disabled={this.props.Auth_Signup.resendOTPIsBlocked}
              onClick={this.handleReSendOTP}
              loading={this.props.Auth_Signup.isLoading}
            >
              <span className={'auth-btn_text'}>{this.props.Auth_Signup.resendOTPIsBlocked ? `Wait ${this.state.timer} seconds` : 'Resend OTP'} </span>
            </Button>
          </div>
        </div>
      </Fragment>
    )
  }

}

export default connect(state => ({ Auth_Signup: state.Auth_Signup }), {
  resendOTP,
  blockedResendOTP,
  sendConfirm,
  changeOTP,
  setError
})(FormOTP);
