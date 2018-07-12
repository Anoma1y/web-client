import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
} from '@material-ui/core';
import {
  AccountBalance as AccountBalanceIcon,
  CreditCard as CreditCardIcon,
  Description as DescriptionIcon,
} from '@material-ui/icons';
import { changeActiveType } from '../../store/actions';

@connect(({ Wallet_Withdraw }) => ({ Wallet_Withdraw }), ({
  changeActiveType
}))
export default class Type extends Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={12}>

          <div className={'operation-type-list'}>

            <button
              className={`operation-type-item ${this.props.Wallet_Withdraw.activeType === 'BOL' ? 'operation-type-item__active' : ''}`}
              onClick={() => this.props.changeActiveType('BOL')}
            >
              <div className={'operation-type-item_icon'}>
                <DescriptionIcon />
              </div>
              <div className={'operation-type-item_header'}>
                SEPA
              </div>
              <div className={'operation-type-item_description'}>
                Send the money through Single Euro Payments Area
              </div>
            </button>

            <button
              className={`operation-type-item operation-type-item__disabled ${this.props.Wallet_Withdraw.activeType === 'BANK_TRANSFER' ? 'operation-type-item__active' : ''}`}
              disabled
              onClick={() => this.props.changeActiveType('BANK_TRANSFER')}
            >
              <div className={'operation-type-item_icon'}>
                <AccountBalanceIcon />
              </div>
              <div className={'operation-type-item_header'}>
                Bank Transfer
              </div>
              <div className={'operation-type-item_description'}>
                Send the money from your internet banking
              </div>
            </button>

            <button
              className={`operation-type-item operation-type-item__disabled ${this.props.Wallet_Withdraw.activeType === 'CARDPAY' ? 'operation-type-item__active' : ''}`}
              disabled
              onClick={() => this.props.changeActiveType('CARDPAY')}
            >
              <div className={'operation-type-item_icon'}>
                <CreditCardIcon />
              </div>
              <div className={'operation-type-item_header'}>
                Credit Card
              </div>
              <div className={'operation-type-item_description'}>
                Send the money to your Credit Card
              </div>
            </button>
          </div>

        </Grid>
      </Grid>
    );
  }
}
