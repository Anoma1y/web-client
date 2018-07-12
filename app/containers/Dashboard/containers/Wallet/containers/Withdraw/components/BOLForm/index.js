import React, { Component } from 'react';
import {
  reduxForm,
  Field
} from 'redux-form';
import FieldText from 'containers/Dashboard/components/FieldText';
import FieldAmount from 'containers/Dashboard/components/FieldAmount';
import {
  Grid,
} from '@material-ui/core';

const validate = (values) => {
  const errors = {};

  if (!values.sourceIBAN) {
    errors.sourceIBAN = 'Required';
  }
  if (!values.targetIBAN) {
    errors.targetIBAN = 'Required';
  }
  if (!values.bic) {
    errors.bic = 'Required';
  }
  if (!values.country) {
    errors.country = 'Required';
  }
  if (!values.addressLine) {
    errors.addressLine = 'Required';
  }
  if (!values.amount) {
    errors.amount = 'Required';
  } else if (values.amount <= 0) {
    errors.amount = 'Amount cannot be 0';
  }

  if (!values.description) {
    errors.description = 'Required';
  }

  return errors;
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
                name={'sourceIBAN'}
                component={FieldText}
                label={'Source IBAN for withdrawal'}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name={'targetIBAN'}
                component={FieldText}
                label={'Target IBAN for withdrawal'}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name={'bic'}
                component={FieldText}
                label={'Target BIC for withdrawal'}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name={'country'}
                component={FieldText}
                label={'Target country for withdrawal'}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name={'addressLine'}
                component={FieldText}
                label={'Target address line for withdrawal'}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name={'amount'}
                component={FieldAmount}
                label={'Amount of withdrawal'}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name={'description'}
                component={FieldText}
                label={'Description of withdrawal'}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
