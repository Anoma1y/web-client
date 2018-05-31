import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Grid, Button, FormControl, FormLabel } from '@material-ui/core';
import { updateUserContactRequest } from './store/actions';
import FormOTP from './components/FormOTP/';
import FieldTextAuth from '../../components/FieldTextAuth';

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
  return errors;
};

@connect((state) => ({
  Dashboard_Profile: state.Dashboard_Profile,
  Profile_Account: state.Profile_Account,
  initialValues: {
    contact: state.Dashboard_Profile.profile.contact
  }
}), ({
    updateUserContactRequest
  }))
@reduxForm({
  form: 'ProfileAccount',
  validate,
  enableReinitialize: true
})
export default class Account extends Component {

  handleSubmitContactMain = (type) => {
    this.props.updateUserContactRequest(type);
  }

  handleSubmitContactOTP = (type) => {

  }

  handleSubmitContactOTPResend = (type) => {

  }

  /**
   * Рендер формы для получения OTP кода на привязку (почты или телефона)
   * @param type - почта или телефон
   * @returns {*}
   */
  renderContactMainForm = (type) => {
    const { contact } = this.props.Dashboard_Profile.profile;
    const label = type === 'email' ? 'Email' : 'Phone';
    const isVerified = type === 'email' ? contact.emailVerified : contact.phoneVerified;
    return (
      <Fragment>
        <FormLabel component="legend" className={'profile-form_label'}>{label}</FormLabel>
        <Grid container alignItems={'center'} spacing={8} className={'profile-form'} justify={'flex-start'}>
          <Grid item xs={6}>
            <Field name={`contact.${type}`} component={FieldTextAuth} label={label} placeholder={label} isVerified={isVerified} />
          </Grid>
          {
            !isVerified &&
              <Grid item xs={3}>
                <Button fullWidth color={'primary'} className={'profile-form_btn'} onClick={() => this.handleSubmitContactMain(type)}>{'Confirm'}</Button>
              </Grid>
          }
        </Grid>
      </Fragment>
    );
  };

  renderForm = () => {
    const { otpIsSend } = this.props.Profile_Account;
    return (
      <Grid container className={'profile'}>

        <Grid container className={'profile-form_wrapper'}>

          <Grid item xs={6}>
            <FormControl fullWidth>
              { otpIsSend.email ? <FormOTP type={'email'} /> : this.renderContactMainForm('email') }
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              { otpIsSend.phoneNumber ? <FormOTP type={'phoneNumber'} /> : this.renderContactMainForm('phoneNumber') }
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

