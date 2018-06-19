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
  changeCoinSerial,
  changeAmount,
  reset
} from './store/actions';
import { calulcateExchange } from 'lib/amount';
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
  changeCoinSerial,
  changeAmount,
  reset
}))
export default class Exchange extends Component {
  state = {
    ready: false,
    errorText: '',
    limitError: false,
    blockUpdate: false
  }

  componentDidMount() {
    const { coinException } = this.props;

    this.props.pullCoins(coinException)
      .then(() => this.setState({ ready: true }))
      .catch(() => this.setState({ ready: true, errorText: 'Ошибочка' }));
  }

  componentWillUnmount() {
    this.props.reset();
    clearTimeout(this.timeBlock);
  }

  debounceUpdate = _.debounce(() => {
    this.props.pullRates(true);
  }, 2000)

  handleChangeCurrentCoinExchange = (event) => {
    const { value } = event.target;

    this.props.changeCoinSerial(value);
    this.props.pullRates();
  };

  handleChangeAmountExchange = (event, type) => {
    const { value } = event.target;
    const { rates, } = this.props.Wallet_Exchange;
    const amount = calulcateExchange(value, type, rates.rate);

    this.props.changeAmount(amount);
    this.debounceUpdate();
  };

  updateRates = () => {
    this.setState({ blockUpdate: true });
    this.timeBlock = setTimeout(() => this.setState({ blockUpdate: false }), 5000);

    this.props.pullRates(true);
  }

  renderLoader = () => <CircularProgress size={24} className={'dashboard_loading'} />

  renderContent = () => {
    const { coins, outCoinSerial, amount, rates, isLoadRate, isLoading } = this.props.Wallet_Exchange;

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
                    label={'Sell'}
                    disabled={outCoinSerial === ''}
                    onChange={(event) => this.handleChangeAmountExchange(event, 'sell')}
                    value={amount.sell}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />

                </Grid>

                <Grid item xs={4}>

                  <TextField
                    fullWidth
                    label={'Buy'}
                    disabled={outCoinSerial === ''}
                    onChange={(event) => this.handleChangeAmountExchange(event, 'buy')}
                    value={amount.buy}
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
                      value={outCoinSerial}
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

            {
              isLoadRate &&
              <Grid item xs={12}>

                <Grid container>
                  <Grid item xs={12}>
                    <p>Курс: {rates.rate}</p>
                    <p>Reserve: {rates.reserve}</p>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container justify={'space-around'}>
                      <Grid item xs={2}>
                        <div className={'mui-btn'}>
                          <Button
                            fullWidth
                            variant={'raised'}
                            color={'primary'}
                            disabled={isLoading}
                          >
                            Обменять
                          </Button>
                          {
                            isLoading && <CircularProgress size={24} className={'mui-btn_progress mui-btn_progress__24'} />
                          }
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <div className={'mui-btn'}>
                          <Button
                            fullWidth
                            variant={'raised'}
                            color={'primary'}
                            disabled={this.state.blockUpdate || isLoading}
                            onClick={this.updateRates}
                          >
                            Обновить
                          </Button>
                          {
                            isLoading && <CircularProgress size={24} className={'mui-btn_progress mui-btn_progress__24'} />
                          }
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>
            }

          </Grid>

        </Grid>
      </Grid>
    );
  }

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
