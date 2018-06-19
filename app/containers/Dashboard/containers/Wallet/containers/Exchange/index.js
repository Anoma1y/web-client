import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import {
  Grid,
  Select,
  MenuItem,
  FormControl,
  Button,
  TextField,
  InputLabel,
  CircularProgress
} from '@material-ui/core';
import {
  pullRates,
  pullCoins,
  changeCoin,
  changeAmount
} from './store/actions';
import _ from 'lodash';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      decimalScale={2}
      allowNegative={false}
      thousandSeparator
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
    />
  );
}

@connect((state) => ({ Wallet_Exchange: state.Wallet_Exchange }), ({
  pullRates,
  pullCoins,
  changeCoin,
  changeAmount
}))
export default class Exchange extends Component {
  state = {
    ready: false,
    errorText: ''
  }

  componentDidMount() {
    const { coinException } = this.props;

    this.props.pullCoins(coinException)
      .then(() => this.setState({ ready: true }))
      .catch(() => this.setState({ ready: true, errorText: 'Ошибочка' }));
  }

  debounceUpdate = _.debounce(() => {
    console.log('update debounce');
  }, 1000)

  handleChangeCurrentCoinExchange = (event) => {
    const { value } = event.target;
    this.props.changeCoin(value);
    this.props.pullRates();
  };

  handleChangeAmountExchange = (event) => {
    const { value } = event.target;
    this.props.changeAmount(value);
    this.debounceUpdate();
  };

  renderLoader = () => <CircularProgress size={24} className={'dashboard_loading'} />

  renderContent = () => {
    const { coins, outCoin, amount } = this.props.Wallet_Exchange;

    return (
      <Grid container className={'wallet-exchange'}>
        <Grid item xs={12}>

          <Grid container>
            <Grid item xs={12}>
              Для обмена, выберите кошелек, в валюту которого вы хотите конвертировать средства
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={40} justify={'center'}>

                <Grid item xs={4}>

                  <TextField
                    fullWidth
                    label={'Amount'}
                    placeholder={'Entering amount'}
                    onChange={this.handleChangeAmountExchange}
                    value={amount}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />

                </Grid>

                <Grid item xs={4}>
                  <FormControl >
                    <InputLabel htmlFor={'coin-select'}>Coin</InputLabel>
                    <Select
                      fullWidth
                      native
                      // error={currencyError}
                      value={outCoin}

                      id={'coin-select'}
                      onChange={this.handleChangeCurrentCoinExchange}
                      inputProps={{
                        id: 'coin-select',
                      }}
                    >
                      <option value="" disabled hidden />
                      {
                        coins.map((coin) => <option key={coin.serial} value={coin.serial}>{coin.name}</option>)
                      }
                    </Select>
                  </FormControl>
                </Grid>

              </Grid>
            </Grid>

            <Grid item xs={12}>

              <Grid container>

                <Grid item xs={12}>

                  Курс обмена: 1 EUR = 1.23 USD

                </Grid>

                <Grid item xs={12}>

                  <Button
                    variant={'raised'}
                    color={'primary'}
                  >
                    Обменять
                  </Button>

                </Grid>

              </Grid>

            </Grid>

          </Grid>

        </Grid>
      </Grid>
    );
  }

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
