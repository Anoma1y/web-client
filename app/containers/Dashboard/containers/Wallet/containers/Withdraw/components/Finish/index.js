import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

@connect(({ Wallet_Withdraw }) => ({ Wallet_Withdraw }))
export default class Finish extends Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={12} className={'withdraw-finish'}>

          <Grid container>
            <Grid item xs={6}>

              <div>Request identifier</div>
              <div>Request coin</div>
              <div>
                <div>Bank details</div>
                <div>
                  <div>Full name of the receiver</div>
                  <div>Account number</div>
                  <div>International account number (IBAN)</div>
                  <div>BIC</div>
                  <div>SWIFT</div>
                  <div>Bank name</div>
                  <div>Bank address</div>
                </div>
              </div>
              <div>Amount</div>
              <div>Commission</div>
              <div>Request status</div>
              <div>Type</div>
              <div>Created at</div>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    );
  }
}
