import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  FormLabel,
  FormControl,
  TextField,
  Button,
  Select,
  CircularProgress,
  FormHelperText
} from '@material-ui/core';
import {
  pullIssuers,
  changeName,
  changeCurrency,
  createWallet
} from './store/actions';

@connect((state) => ({ AddProduct_Wallet: state.AddProduct_Wallet }), ({
  pullIssuers,
  changeName,
  changeCurrency,
  createWallet
}))
export default class Wallet extends Component {

  state = {
    ready: false,
    errorText: null
  };

  componentDidMount() {
    this.props.pullIssuers()
      .then(() => this.setState({ ready: true }))
      .catch(() => this.setState({ ready: true, errorText: 'Error loading' }));
  }

  /**
   * Метод для изменения валюты кошелька
   * @param e - event
   * @returns {*}
   */
  handleCurrencyChange = (e) => this.props.changeCurrency(e.target.value);

  /**
   * Метод для изменения имени кошелька
   * @param e - event
   * @returns {*}
   */
  handleNameChange = (e) => this.props.changeName(e.target.value);

  /**
   * Метод для создания кошелька
   * @returns {(function(*=, *))|*}
   */
  handleClickCreate = () => this.props.createWallet();

  /**
   * Рендер лоадера, пока данные загружаются
   * @param size - размер лоадера (24)
   * @returns {*}
   */
  renderLoader = (size) => <CircularProgress size={size} className={'dashboard_loading'} />

  /**
   * Рендер основного контента
   * @returns {*}
   */
  renderContent = () => {
    const {
      name,
      currency,
      issuers,
      isError,
      isLoading
    } = this.props.AddProduct_Wallet;
    const nameError = isError && name.length < 2;
    const currencyError = isError && currency.length === 0;

    return (
      <FormControl fullWidth className={'addProduct-form_control'}>
        <FormLabel component={'legend'} className={'addProduct-form_label'} disabled>Create wallet</FormLabel>
        <Grid container justify={'center'} className={'addProduct-form'}>
          <Grid item xs={6}>

            <Grid container className={'addProduct-form_item'}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={'Wallet name'}
                  placeholder={'Wallet name'}
                  error={nameError}
                  value={name}
                  onChange={this.handleNameChange}
                />
                {
                  nameError && <FormHelperText className={'addProduct-form_error'}>Минимальная длина кошелька - 2 символа</FormHelperText>
                }
              </Grid>
            </Grid>

            <Grid container className={'addProduct-form_item'}>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  native
                  error={currencyError}
                  value={currency}
                  onChange={this.handleCurrencyChange}
                >
                  <option value={''} hidden disabled>Currency</option>
                  {
                    issuers.map((issuer) => {
                      return <option key={issuer.id} value={issuer.id}>{issuer.sn}</option>
                    })
                  }
                </Select>
                {
                  currencyError && <FormHelperText className={'addProduct-form_error'}>Укажите currency</FormHelperText>
                }
              </Grid>
            </Grid>

            <Grid container className={'addProduct-form_item'} justify={'center'}>
              <Grid item xs={4}>
                <div className={'mui-btn'}>
                  <Button
                    fullWidth
                    variant={'raised'}
                    color={'primary'}
                    disabled={isLoading}
                    onClick={this.handleClickCreate}
                  >
                    Create
                  </Button>
                  {
                    isLoading && <CircularProgress size={24} className={'mui-btn_progress mui-btn_progress__24'} />
                  }
                </div>
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </FormControl>
    )
  }

  /**
   * Рендер ошибки
   * todo добавить ошибку
   * @returns {*}
   */
  renderError = () => (
    <div>Error</div>
  );

  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          {
            this.state.ready
              ? this.renderContent()
              : this.state.errorText
                ? this.renderError()
              : this.renderLoader(70)
          }
        </Grid>
      </Grid>
    );
  }
}
