import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Grid, Button, Select, InputLabel, TextField, FormControl, InputAdornment, FormLabel, FormHelperText } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';
import {
  updateUserAddress,
  updateUserContactRequest
} from '../../store/actions';
import countries from 'lib/countries';
import FormOTP from './components/FormOTP';

/**
 * Рендер формы для контактных данных (почта или телефон)
 * @param input - инпут
 * @param error - текст ошибки
 * @param touched - хз
 * @param label - надпись
 * @param isVerified - проверка подтвержден ли (почта или телефон)
 * @param custom - плейсхолдер и т.п.
 * @returns {*}
 */
const renderAuthField = ({ input, meta: { error, touched }, label, isVerified, ...custom }) => (
  <Fragment>
    <TextField
    fullWidth
    error={error && touched}
    className={'profile-form_input'}
    label={label}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          { isVerified ? <Check className={'profile_icon__verified'} /> : <Close className={'profile_icon__unverified'} /> }
        </InputAdornment>
      ),
    }}
    {...input}
    {...custom}
  />
    <FormHelperText error={error && touched}>{error}</FormHelperText>
  </Fragment>
);

/**
 * Рендер формы для адреса
 * @param input - инпут
 * @param label - надпись
 * @param touched - хз
 * @param error - текст ошибки
 * @param custom - плейсхолдер и т.п.
 * @returns {*}
 */
export const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <Fragment>
    <TextField
      fullWidth
      label={label}
      error={touched && error}
      className={'profile-form_input'}
      {...input}
      {...custom}
    />
    <FormHelperText error={error && touched}>{error}</FormHelperText>
  </Fragment>
);

/**
 * Рендер выпадающего списка для выбора стран
 * @param input - инпут
 * @param touched - хз
 * @param error - текст ошибки
 * @param children - <option></option>
 * @returns {*}
 */
const renderSelectField = ({ input, meta: { touched, error }, children }) => (
  <Select
    native
    error={touched && error}
    {...input}
    onChange={(event) => {
      input.onChange(event.target.value);
    }}
  >
    {children}
  </Select>
);

/**
 * Функция для валидации
 * @param values - значение поля
 * @returns {{contact: {}, address: {}}}
 */
export const validate = (values) => {
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
  initialValues: {
    address: state.Dashboard_Profile.profile.address,
    contact: state.Dashboard_Profile.profile.contact
  }
}), ({
    updateUserAddress,
    updateUserContactRequest
  }))
@reduxForm({
  form: 'ProfileAccount',
  validate,
  enableReinitialize: true
})
export default class Account extends Component {

  handleSubmitPostAddress = () => {
    this.props.updateUserAddress();
  };

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
    return (
      <Fragment>
        <FormLabel component="legend" className={'profile-form_label'}>{label}</FormLabel>
        <Grid container alignItems={'center'} spacing={8} className={'profile-form'} justify={'flex-start'}>
          <Grid item xs={6}>
            <Field name={`contact.${type}`} component={renderAuthField} label={label} placeholder={label} isVerified={type === 'email' ? contact.emailVerified : contact.phoneVerified} />
          </Grid>
          <Grid item xs={3}>
            <Button fullWidth color={'primary'} className={'profile-form_btn'} onClick={() => this.handleSubmitContactMain(type)}>{'Confirm'}</Button>
          </Grid>
        </Grid>
      </Fragment>
    );
  };

  renderForm = () => {
    const { otpIsSend } = this.props.Dashboard_Profile;
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

        <Grid container className={'profile-form_wrapper'}>
          <FormControl fullWidth>
            <FormLabel component={'legend'} className={'profile-form_label'}>Post address</FormLabel>

            <Grid container spacing={40} className={'profile-form'} justify={'flex-start'}>
              <Grid item xs={5}>
                <Field name={'address.street'} component={renderTextField} label={'Street'} placeholder={'Street'} />
              </Grid>
              <Grid item xs={2}>
                <Field name={'address.houseNumber'} component={renderTextField} label={'House number'} placeholder={'House number'} />
              </Grid>
              <Grid item xs={2}>
                <Field name={'address.zipCode'} component={renderTextField} label={'ZIP/Postal code'} placeholder={'ZIP/Postal code'} />
              </Grid>
            </Grid>

            <Grid container spacing={40} className={'profile-form'} justify={'flex-start'}>
              <Grid item xs={5}>
                <Field name={'address.city'} component={renderTextField} label={'City'} placeholder={'City'} />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Field name={'address.country'} component={renderSelectField}>
                    {countries.map((item) => <option key={item.key} value={item.value}>{item.label}</option>)}
                  </Field>
                </FormControl>
              </Grid>
            </Grid>

          </FormControl>
        </Grid>

        <Grid container>
          <Grid item xs={2}>
            <Button
              fullWidth
              color={'primary'}
              variant={'raised'}
              size={'large'}
              onClick={this.handleSubmitPostAddress}
            >
              Submit
            </Button>
          </Grid>
        </Grid>

      </Grid>
    );
  }

  render() {
    return this.renderForm();
  }
}

