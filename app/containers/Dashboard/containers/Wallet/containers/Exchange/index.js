import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Select,
  FormControl,
  Button,
  TextField,
  InputLabel,
  CircularProgress
} from '@material-ui/core';
import NumberFormat from 'containers/Dashboard/components/NumberFormat';
import MuiButton from 'components/MuiButton';
import {
  pullRates,
  pullCoins,
  changeCoinSerial,
  changeAmount,
  reset
} from './store/actions';
import { calulcateExchange } from 'lib/amount';

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

  /**
   * Метод для переключения кошелька, в который будет переведена валюта
   * Также будет получены новые рейты и сброшены значения покупки/продажи
   * @param event - эвент
   */
  handleChangeCurrentCoinExchange = (event) => {
    const { value } = event.target;

    this.props.changeCoinSerial(value);
    this.props.pullRates();
  };

  /**
   * Метод для изменения значений покупки/продажи
   * @param event - эвент
   * @param type - тип вводимого значения sell/buy
   */
  handleChangeAmountExchange = (event, type) => {
    const { value } = event.target;
    const { rates } = this.props.Wallet_Exchange;
    const amount = calulcateExchange(value, type, rates.rate);

    this.props.changeAmount(amount);
  };

  /**
   * Метод для обновления рейтов
   * Возвращает новый рейт с промиса и выполняет обновление значений цены - продажи
   * (валюты в которой находиться пользователь)
   */
  updateRates = () => {
    const { amount } = this.props.Wallet_Exchange;

    this.props.pullRates(true)
      .then((data) => this.props.changeAmount(calulcateExchange(amount.sell, 'sell', data.rate)))
      .catch(() => console.log('Error, heh'));

    this.setState({ blockUpdate: true });
    this.timeBlock = setTimeout(() => this.setState({ blockUpdate: false }), 5000);
  };

  renderLoader = () => <CircularProgress size={24} className={'dashboard_loading'} />;

  renderEmptyExchange = () => (
    <Grid item xs={12} className={'wallet-exchange_wrapper'}>
      <div className={'wallet-exchange_empty'}>No wallets for exchange</div>
    </Grid>
  )

  renderContent = () => {
    const {
      coins,
      outCoinSerial,
      amount,
      rates,
      isLoadRate,
      isLoading
    } = this.props.Wallet_Exchange;

    return (
      <Grid container className={'wallet-exchange'}>
        <Grid item xs={12}>

          <Grid container>
            <Grid item xs={12} className={'wallet-exchange_wrapper'}>
              <div className={'wallet-exchange_text'}>
                Для обмена, выберите кошелек, в валюту которого вы хотите конвертировать средства
              </div>
            </Grid>

            {
              coins.length === 0 ? this.renderEmptyExchange() :
              <Fragment>
                <Grid item xs={12} className={'wallet-exchange_wrapper'}>
                  <Grid container spacing={40} justify={'flex-start'} className={'wallet-exchange-form'}>

                    <Grid item xs={2} className={'wallet-exchange-form_item wallet-exchange-form_text'}>

                      <TextField
                        fullWidth
                        label={(rates && rates.rate) ? `Sell ${rates.inIssuer.currency}` : 'Sell'}
                        disabled={!isLoadRate || !rates}
                        onChange={(event) => this.handleChangeAmountExchange(event, 'sell')}
                        value={amount.sell}
                        InputProps={{
                          inputComponent: NumberFormat,
                        }}
                      />

                    </Grid>

                    <Grid item xs={2} className={'wallet-exchange-form_item wallet-exchange-form_text'}>

                      <TextField
                        fullWidth
                        label={(rates && rates.rate) ? `Buy ${rates.outIssuer.currency}` : 'Buy'}
                        disabled={!isLoadRate || !rates}
                        onChange={(event) => this.handleChangeAmountExchange(event, 'buy')}
                        value={amount.buy}
                        InputProps={{
                          inputComponent: NumberFormat,
                        }}
                      />

                    </Grid>

                    <Grid item xs={3} className={'wallet-exchange-form_item wallet-exchange-form_select'}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor={'coin-select'}>Wallet</InputLabel>
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
                          {coins.map((coin) => <option key={coin.serial} value={coin.serial}>{coin.name}</option>)}
                        </Select>
                      </FormControl>
                    </Grid>

                  </Grid>
                </Grid>
                {
                  (isLoadRate && rates && rates.rate) &&
                  <Grid item xs={12} className={'wallet-exchange_wrapper wallet-exchange-operations'}>

                    <Grid container>
                      <Grid item xs={12} className={'wallet-exchange-operations_rates'}>
                        <p>Rate {`${rates.inIssuer.currency}/${rates.outIssuer.currency}`}: {rates.rate}</p>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container justify={'flex-start'} spacing={40}>
                          <Grid item xs={2} className={'wallet-exchange-operations_btn wallet-exchange-operations_btn__success'}>
                            <MuiButton isLoading={isLoading}>
                              <Button
                                fullWidth
                                variant={'raised'}
                                color={'primary'}
                                disabled={isLoading}
                              >
                                SUBMIT
                              </Button>
                            </MuiButton>
                          </Grid>
                          <Grid item xs={2} className={'wallet-exchange-operations_btn wallet-exchange-operations_btn__update'}>
                            <MuiButton isLoading={isLoading}>
                              <Button
                                fullWidth
                                variant={'raised'}
                                color={'primary'}
                                disabled={this.state.blockUpdate || isLoading}
                                onClick={this.updateRates}
                              >
                                UPDATE RATE
                              </Button>
                            </MuiButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                }
              </Fragment>

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
