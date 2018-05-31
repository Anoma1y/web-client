import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, FormLabel, TextField, FormHelperText } from '@material-ui/core';
import {
  updateUserContactConfirm,
  updateUserContactResendOTP,
  blockedResendOTP,
  changeOTP,
  reset
} from '../../store/actions';
import { clearAll } from 'containers/Notification/store/actions';

@connect((state) => ({ Profile_Account: state.Profile_Account }), ({
  updateUserContactConfirm,
  updateUserContactResendOTP,
  blockedResendOTP,
  clearAll,
  changeOTP,
  reset
}))
export default class FormOTP extends Component {

  state = {
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

  handleSubmitContactOTP = (type) => {
    this.props.updateUserContactConfirm(type);
  }

  handleSubmitContactOTPResend = (type) => {

    this.setState({
      timer: 30
    });

    this.resendTimeout = setInterval(() => {
      if (this.state.timer === 1) {
        this.props.blockedResendOTP(type, false);
        clearInterval(this.resendTimeout);
      }
      this.setState({
        timer: this.state.timer - 1
      });
    }, 1000);

    this.props.updateUserContactResendOTP(type);
  };

  /**
   * Метод для проверки ввода ОТП только цифр
   * @param e
   */
  handleChangeOTP = (e) => {
    const { value } = e.target;
    const { type } = this.props;
    const otp = value.replace(/[^\d]/g, '');
    this.props.changeOTP(type, otp);
  };

  render() {
    const { type } = this.props;
    const label = type === 'email' ? 'Email' : 'Phone';
    return (
      <Fragment>
        <FormLabel component={'legend'} className={'profile-form_label'}>{label}</FormLabel>
        <Grid container alignItems={'center'} spacing={8} className={'profile-form'} justify={'flex-start'}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              name={`otp.${type}`}
              label={'OTP'}
              onChange={this.handleChangeOTP}
              placeholder={'Entering OTP'}
            />
            <FormHelperText> </FormHelperText>
          </Grid>
          <Grid item xs={3}>
            <Button
              fullWidth
              color={'primary'}
              className={'profile-form_btn'}
              variant={'raised'}
              onClick={() => this.handleSubmitContactOTP(type)}
            >
              Send OTP
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              fullWidth
              disabled={this.props.Profile_Account.resendOTPIsBlocked[type]}
              color={'secondary'}
              className={'profile-form_btn'}
              variant={'raised'}
              onClick={() => this.handleSubmitContactOTPResend(type)}
            >
              {this.props.Profile_Account.resendOTPIsBlocked[type] ? `${this.state.timer} seconds` : 'Resend OTP'}
            </Button>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}
