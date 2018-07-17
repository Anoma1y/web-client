import React, { Component, Fragment } from 'react';
import {
  Field,
  reduxForm
} from 'redux-form';
import { connect } from 'react-redux';
import {
  Grid,
  FormControl,
  FormLabel,
  Button,
} from '@material-ui/core';
import {
  updateUserContactRequest,
  updateUserContactConfirm,
  updateUserContactResendOTP,
  blockedResendOTP,
  reset
} from './store/actions';
import FieldTextAuth from '../../components/FieldTextAuth';
import FieldText from '../../components/FieldText';
import { clearAll } from 'containers/Notification/store/actions';
import { getValuesDeep } from 'lib/utils';
import CONFIG from 'lib/config';

/**
 * Функция для валидации
 * @param values - значение поля
 * @returns {{contact: {}, address: {}}}
 */
const validate = (values) => {
  const errors = {
    contact: {},
    address: {}
  };

  if (!values.contact.email) {
    errors.contact.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.contact.email)) {
    errors.contact.email = 'Invalid email address';
  }

  if (!values.contact.phoneNumber) {
    errors.contact.phoneNumber = 'Required';
  } else if (!/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/i.test(values.contact.phoneNumber)) {
    errors.contact.phoneNumber = 'Invalid phone number';
  }

  return getValuesDeep(errors).every((item) => item === '') ? {} : errors;
};

const normalizeNumber = value => {
  if (!value) return value;

  return value.replace(/[^\d]/g, '');
};

@connect((state) => ({
  Profile_Account: state.Profile_Account,
  Dashboard_Profile: state.Dashboard_Profile,
  initialValues: {
    contact: state.Dashboard_Profile.profile.contact
  }
}), ({
    updateUserContactRequest,
    updateUserContactConfirm,
    updateUserContactResendOTP,
    blockedResendOTP,
    clearAll,
    reset
  }))
@reduxForm({
  form: 'ProfileAccount',
  validate,
  enableReinitialize: true
})
export default class Account extends Component {

  state = {
    timer: 0
  };

  componentWillUnmount() {
    clearInterval(this.resendTimeout);
    this.props.clearAll();
    this.props.reset();
  }

  /**
   * Метод для подтверждения отправки логина для получения OTP
   * @param type - тип email/phoneNumber
   * @returns {(function(*, *))|*}
   */
  handleSubmitContactMain = (type) => this.props.updateUserContactRequest(type);

  /**
   * Метод для подтверждения отправки OTP
   * @param type - тип email/phoneNumber
   */
  handleSubmitContactOTP = (type) => this.props.updateUserContactConfirm(type);

  /**
   * Метод для повторной отправки OTP
   * @param type - тип email/phoneNumber
   */
  handleSubmitContactOTPResend = (type) => {
    this.setState({ timer: CONFIG.OTP_BLOCK_TIMEOUT });

    this.resendTimeout = setInterval(() => {
      if (this.state.timer === 1) {
        this.props.blockedResendOTP(type, false);
        clearInterval(this.resendTimeout);
      }
      this.setState({ timer: this.state.timer - 1 });
    }, 1000);

    this.props.updateUserContactResendOTP(type);
  };

  /**
   * Рендер основной формы для ввода email/phoneNumber или, если уже есть email/phoneNumber, то вывод уже подтвержденного значения
   * @param type - тип email/phoneNumber
   * @returns {*}
   */
  renderFormMain = (type) => {
    const { contact } = this.props.Dashboard_Profile.profile;

    if (!contact) return null;

    const label = type === 'email' ? 'Email' : 'Phone';
    const isVerified = type === 'email' ? contact.emailVerified : contact.phoneVerified;

    return (
      <Fragment>
        <FormLabel component={'legend'} className={'profile-form_label'}>{label}</FormLabel>
        <Grid container alignItems={'center'} spacing={8} className={'profile-form'} justify={'flex-start'}>
          <Grid item xs={6}>
            <Field
              name={`contact.${type}`}
              component={FieldTextAuth}
              label={label}
              placeholder={label}
              isVerified={isVerified}
            />
          </Grid>
          {
            !isVerified &&
            <Grid item xs={3}>
              <Button
                fullWidth
                color={'primary'}
                className={'profile-form_btn'}
                onClick={() => this.handleSubmitContactMain(type)}
              >
                Confirm
              </Button>
            </Grid>
          }
        </Grid>
      </Fragment>
    );
  }

  /**
   * Рендер формы для ввода OTP
   * @param type - тип email/phoneNumber
   * @returns {*}
   */
  renderFormOTP = (type) => {
    const label = type === 'email' ? 'Email' : 'Phone';

    return (
      <Fragment>
        <FormLabel component={'legend'} className={'profile-form_label'}>{label}</FormLabel>
        <Grid container alignItems={'center'} spacing={8} className={'profile-form'} justify={'flex-start'}>
          <Grid item xs={3}>
            <Field
              name={'contact.otp'}
              component={FieldText}
              label={'OTP'}
              placeholder={'Entering OTP'}
              normalize={normalizeNumber}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              fullWidth
              color={'primary'}
              className={'profile-form_btn'}
              variant={'raised'}
              onClick={() => this.handleSubmitContactOTP(type)}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={4}>
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
    );
  }

  renderContact = () => {
    const { otpIsSend } = this.props.Profile_Account;

    return (
      <Grid container className={'profile'}>
        <Grid container className={'profile-form_wrapper'}>
          <Grid item xs={5}>
            <FormControl fullWidth>
              {
                otpIsSend.email
                ? this.renderFormOTP('email')
                : this.renderFormMain('email')
              }
            </FormControl>
          </Grid>

          <Grid item xs={5}>
            <FormControl fullWidth>
              {
                otpIsSend.phoneNumber
                  ? this.renderFormOTP('phoneNumber')
                  : this.renderFormMain('phoneNumber')
              }
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  render() {
    return this.renderContact();
  }
}

