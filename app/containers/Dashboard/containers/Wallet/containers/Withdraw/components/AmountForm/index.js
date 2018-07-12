import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  TextField
} from '@material-ui/core';
import Amount from 'components/Amount';
import NumberFormat from 'containers/Dashboard/components/NumberFormat';
import {
  calculateCommission,
  changeAmount,
} from '../../store/actions';
import _ from 'lodash';

@connect(({ Wallet_Withdraw, Dashboard_Wallet }) => ({ Wallet_Withdraw, Dashboard_Wallet }), ({
  calculateCommission,
  changeAmount,
}))
export default class AmountForm extends Component {

  handleCalculateCommission = _.debounce(() => {
    const { coin } = this.props.Dashboard_Wallet;
    const errorAmount = this.props.Wallet_Withdraw.amount > coin.amount;

    if (!errorAmount) {
      this.props.calculateCommission();
    }
  }, 1500);

  handleChangeAmount = (event) => {
    const { value } = event.target;

    this.handleCalculateCommission();
    this.props.changeAmount(value);
  };

  render() {
    const { commission, amount } = this.props.Wallet_Withdraw;
    const { coin } = this.props.Dashboard_Wallet;
    const errorAmount = amount > coin.amount;

    return (
      <Grid container>
        <Grid item xs={12} className={'withdraw-amount'}>
          <Grid container>
            <Grid item xs={6} className={'withdraw-amount_description'}>
              <p>To withdraw funds from wallet {coin.amount} ({coin.issuer.currency}) through Transfer Bank application:</p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} className={'withdraw-amount_input'}>
              <TextField
                fullWidth
                label={'Amount'}
                value={amount}
                onChange={this.handleChangeAmount}
                helperText={errorAmount ? `Maximum allowed amount: ${coin.amount} ${coin.issuer.currency}` : ''}
                error={errorAmount}
                InputProps={{
                  inputComponent: NumberFormat,
                }}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} className={'withdraw-amount-commission'}>
              <div className={'withdraw-amount-commission_item'}>
                <div className={'withdraw-amount-commission_text'}>Transaction amount: </div>
                <Amount value={commission.transactionAmount ? commission.transactionAmount : 0} currency={coin.issuer.currency} />
              </div>
              <div className={'withdraw-amount-commission_item'}>
                <div className={'withdraw-amount-commission_text'}>System commission: </div>
                <Amount value={commission.commissionAmountPush ? commission.commissionAmountPush : 0} currency={coin.issuer.currency} />
              </div>
              <div className={'withdraw-amount-commission_divider'} />
              <div className={'withdraw-amount-commission_item'}>
                <div className={'withdraw-amount-commission_text'}>The amount in view of commission: </div>
                <Amount value={commission.recipientAmountPush ? commission.recipientAmountPush : 0} currency={coin.issuer.currency} />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
