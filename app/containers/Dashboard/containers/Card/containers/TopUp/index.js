import React, { Component } from 'react';
import { connect } from 'react-redux';
import NumberFormat from 'containers/Dashboard/components/NumberFormat';
import MuiButton from 'components/MuiButton';
import {
  Grid,
  Button,
  Select,
  TextField,
  CircularProgress,
  InputLabel,
  FormControl,
  Tooltip
} from '@material-ui/core';
import {
  changeAmount,
  setWallet,
  setProvider,
  pullWallets,
  retrieveListPaymentProviders,
  topup,
  reset
} from './store/actions';
import _ from 'lodash';

const TX_TYPE = [
  { name: 'REDEEM', label: 'Redeem' },
  { name: 'TOPUP', label: 'Top Up' }
];

@connect(({ Card_TopUp }) => ({ Card_TopUp }), ({
  changeAmount,
  setWallet,
  setProvider,
  pullWallets,
  retrieveListPaymentProviders,
  topup,
  reset
}))
export default class TopUp extends Component {

  state = {
    ready: false
  }

  componentDidMount() {
    const { cardId } = this.props;

    this.props.pullWallets(cardId)
      .then(() => this.setState({ ready: true }))
      .catch(() => this.setState({ ready: true, errorText: 'Ошибочка' }));
  }

  componentWillUnmount() {
    this.props.reset();
  }

  handleChangeAmount = (event) => {
    const { value } = event.target;

    this.props.changeAmount(value);
  }

  handleChangeCurrentTxType = (event) => {
    const { value } = event.target;

    this.props.setProvider({ accountId: '' });
    this.props.retrieveListPaymentProviders(value);
  };

  handleChangeCurrentProvider = (event) => {
    const { value } = event.target;
    const { providers } = this.props.Card_TopUp;
    const provider = _.find(providers, { accountId: value }) || '';

    this.props.setProvider(provider);
  }

  handleClick = () => {
    this.props.topup();
  };

  renderLoader = () => <CircularProgress size={24} className={'dashboard_loading'} />;

  renderContent = () => {
    const {
      wallet,
      providers,
      provider,
      isLoading
    } = this.props.Card_TopUp;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4}>
              <Tooltip
                enterDelay={150}
                id={'tooltip-controlled_serial'}
                leaveDelay={50}
                placement={'top'}
                title={wallet.serial}
              >
                <p>{wallet.name}</p>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel htmlFor={'tx-select'}>Coin</InputLabel>
                <Select
                  fullWidth
                  native
                  value={this.props.Card_TopUp.txType}
                  id={'tx-select'}
                  onChange={this.handleChangeCurrentTxType}
                >
                  <option value="" disabled hidden />
                  {
                    TX_TYPE.map((tx) => <option key={tx.name} value={tx.name}>{tx.label}</option>)
                  }
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {
            providers.length !== 0 &&
              <Grid container>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor={'tx-select'}>Provider</InputLabel>
                    <Select
                      fullWidth
                      native
                      value={this.props.Card_TopUp.provider.accountId}
                      id={'tx-select'}
                      onChange={this.handleChangeCurrentProvider}
                    >
                      <option value="" disabled hidden />
                      {
                        providers.map((provider) => <option key={provider.accountId} value={provider.accountId}>{provider.account.provider.name}</option>)
                      }
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
          }
          {
            provider.accountId !== '' &&
              <Grid container>
                <Grid item xs={4}>
                  <TextField
                    label={'Amount'}
                    value={this.props.Card_TopUp.amount}
                    onChange={this.handleChangeAmount}
                    InputProps={{
                      inputComponent: NumberFormat,
                    }}
                  />
                </Grid>
              </Grid>
          }

          <Grid container>
            <MuiButton isLoading={isLoading}>
              <Button
                fullWidth
                variant={'raised'}
                color={'primary'}
                disabled={isLoading}
                onClick={this.handleClick}
              >
                Submit
              </Button>
            </MuiButton>

          </Grid>

        </Grid>
      </Grid>
    )
  }

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
