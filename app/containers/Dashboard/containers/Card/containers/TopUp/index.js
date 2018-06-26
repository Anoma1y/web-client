import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Select, TextField, CircularProgress, InputLabel, FormControl } from '@material-ui/core';
import {
  setWallet,
  pullWallets,
  retrieveListPaymentProviders
} from './store/actions';
import _ from 'lodash';

const TX_TYPE = [
  {
    name: 'REDEEM',
    label: 'Redeem'
  },
  {
    name: 'TOPUP',
    label: 'Top Up'
  }
];

@connect(({ Card_TopUp }) => ({ Card_TopUp }), ({
  setWallet,
  pullWallets,
  retrieveListPaymentProviders
}))
export default class TopUp extends Component {

  state = {
    ready: false
  }

  componentDidMount() {
    this.props.pullWallets()
      .then(() => this.setState({ ready: true }))
      .catch(() => this.setState({ ready: true, errorText: 'Ошибочка' }));
  }

  handleChangeCurrentTxType = (event) => {
    const { value } = event.target;
    this.props.retrieveListPaymentProviders(value);
  }

  renderLoader = () => <CircularProgress size={24} className={'dashboard_loading'} />;

  renderContent = () => {
    const { wallet } = this.props.Card_TopUp;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4}>
              <TextField
                fullWidth
                disabled
                label={'Wallet'}
                value={wallet.name}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel htmlFor={'tx-select'}>Coin</InputLabel>
                <Select
                  fullWidth
                  native
                  value={this.props.Card_TopUp.txType}
                  id={'tx-select'}
                  onChange={this.handleChangeCurrentTxType}
                  inputProps={{
                    id: 'tx-select',
                  }}
                >
                  <option value="" disabled hidden />
                  {
                    TX_TYPE.map((tx) => <option key={tx.name} value={tx.name}>{tx.label}</option>)
                  }
                </Select>
              </FormControl>
            </Grid>

          </Grid>

        </Grid>
      </Grid>
    )
  }

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
