import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  FormControl,
} from '@material-ui/core';
import FormOTP from './components/FormOTP/';
import FormMain from './components/FormMain';

@connect((state) => ({
  Profile_Account: state.Profile_Account,
}))
export default class Account extends Component {


  /**
   * Рендер основной формы
   * @returns {*}
   */
  renderForm = () => {
    const { otpIsSend } = this.props.Profile_Account;
    return (
      <Grid container className={'profile'}>
        <Grid container className={'profile-form_wrapper'}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              {
                otpIsSend.email
                ? <FormOTP type={'email'} />
                : <FormMain type={'email'} />
              }
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              {
                otpIsSend.phoneNumber
                ? <FormOTP type={'phoneNumber'} />
                : <FormMain type={'phoneNumber'} />
              }
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  render() {
    return this.renderForm();
  }
}

