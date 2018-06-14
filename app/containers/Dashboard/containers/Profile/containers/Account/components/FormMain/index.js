import React, { Fragment, Component } from 'react';
import {
  Field,
  reduxForm
} from 'redux-form';
import { connect } from 'react-redux';
import {
  Grid,
  FormLabel,
  Button
} from '@material-ui/core';
import { updateUserContactRequest } from '../../store/actions';
import FieldTextAuth from '../../../../components/FieldTextAuth';

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

/**
 * Для фомры инициализируется стейт с Dashboard_Profile
 */
@connect((state) => ({
  Dashboard_Profile: state.Dashboard_Profile,
  initialValues: {
    contact: state.Dashboard_Profile.profile.contact
  }
}), ({ updateUserContactRequest }))
@reduxForm({
  form: 'ProfileAccount',
  validate,
  enableReinitialize: true
})
export default class FormMain extends Component {

  handleSubmitContactMain = (type) => this.props.updateUserContactRequest(type);

  render() {
    const { contact } = this.props.Dashboard_Profile.profile;
    const { type } = this.props;
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
}
