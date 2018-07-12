import React, { Component } from 'react';
import {
  reduxForm,
  Field
} from 'redux-form';
import FieldText from 'containers/Dashboard/components/FieldText';
import AmountForm from '../AmountForm';
import {
  Grid,
} from '@material-ui/core';

const validate = (values) => {
  const errors = {};

  if (!values.fullName) {
    errors.fullName = 'Required';
  }

  if (values.iban && values.iban.length > 1 && !/[A-Z]{2}[0-9]{2}[a-zA-Z0-9]{1,30}/.test(values.iban)) {
    errors.iban = 'Validation error. Example: LT705555511111111187';
  }

  if (values.bic && values.bic.length > 1 && !/[a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?/.test(values.bic)) {
    errors.bic = 'Validation error. Example: NDEALV2XXXX';
  }

  if (values.swift && values.swift.length > 1 && !/[a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?/.test(values.swift)) {
    errors.swift = 'Validation error. Example: MIDLGB22XXX';
  }

  return errors;
};

const normalizeLatin = value => {
  if (!/[^a-zA-Z\s]/.test(value)) return value;
};

@reduxForm({ form: 'WithdrawRequestForm', validate })
export default class RequestForm extends Component {
  render() {
    return (
      <Grid container justify={'flex-start'}>
        <Grid item xs={6} className={'dashboard-form'} >
          <Grid container spacing={40}>
            <Grid item xs={12}>
              <Field
                name={'fullName'}
                component={FieldText}
                label={'Full name of the receiver'}
                normalize={normalizeLatin}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name={'account'}
                component={FieldText}
                label={'Account number'}
                helperText={'Optional field'}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name={'iban'}
                component={FieldText}
                label={'International account number (IBAN)'}
                helperText={'Optional field'}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name={'bic'}
                component={FieldText}
                label={'BIC'}
                helperText={'Optional field'}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name={'swift'}
                component={FieldText}
                label={'SWIFT'}
                helperText={'Optional field'}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name={'name'}
                component={FieldText}
                label={'Bank name'}
                helperText={'Optional field'}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name={'address'}
                component={FieldText}
                label={'Bank address'}
                helperText={'Optional field'}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <AmountForm />
        </Grid>
      </Grid>
    );
  }
}
