import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  reduxForm,
  Field
} from 'redux-form';
import FieldText from 'containers/Dashboard/components/FieldText';
import FieldAmount from 'containers/Dashboard/components/FieldAmount';
import {
  Grid,
  TextField
} from '@material-ui/core';
import { changeCountry } from '../../store/actions';
import countries from 'lib/countries';
import _ from 'lodash';

const validate = (values) => {
  const errors = {};

  if (!values.targetIBAN) {
    errors.targetIBAN = 'Required';
  } else if (values.targetIBAN && values.targetIBAN.length > 1 && !/[A-Z]{2}[0-9]{2}[a-zA-Z0-9]{1,30}/.test(values.targetIBAN)) {
    errors.targetIBAN = 'Validation error. Example: LT705555511111111187';
  }

  if (!values.bic) {
    errors.bic = 'Required';
  } else if (values.bic && values.bic.length > 1 && !/[a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?/.test(values.bic)) {
    errors.bic = 'Validation error. Example: NDEALV2XXXX';
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

@connect(({ Dashboard_Wallet, Wallet_Withdraw }) => ({ Dashboard_Wallet, Wallet_Withdraw }), ({
  changeCountry
}))
@reduxForm({ form: 'WithdrawRequestForm', validate })
export default class RequestForm extends Component {

  handleIBANchangeCountry = (e, v) => {
    if (v.length < 2) {
      this.props.changeCountry();
    }
    if (v.length === 2) {
      const country = _.find(countries, { key: v.toUpperCase() });
      this.props.changeCountry(country);
    }
  };

  render() {
    return (
      <Grid container justify={'flex-start'}>
        <Grid item xs={6} className={'dashboard-form'} >
          <Grid container spacing={40}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                disabled
                value={this.props.Dashboard_Wallet.coin.serial}
                label={'Source IBAN for withdrawal'}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name={'targetIBAN'}
                component={FieldText}
                onChange={(e, v) => this.handleIBANchangeCountry(e, v)}
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
              <TextField
                fullWidth
                disabled
                value={this.props.Wallet_Withdraw.country ? this.props.Wallet_Withdraw.country.label : ''}
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
                name={'description'}
                component={FieldText}
                label={'Description of withdrawal'}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name={'amount'}
                component={FieldAmount}
                label={'Amount of withdrawal'}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
