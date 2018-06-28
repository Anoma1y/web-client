import React, { Component } from 'react';
import { connect } from 'react-redux';
import NumberFormat from 'containers/Dashboard/components/NumberFormat';
import MuiButton from 'components/MuiButton';
import Amount from 'components/Amount';
import {
  Grid,
  Button,
  Select,
  TextField,
  CircularProgress,
  InputLabel,
  FormControl,
  Tooltip,
  Step,
  Stepper,
  StepLabel,
  StepButton,
  StepContent,
  StepIcon,
  MobileStepper
} from '@material-ui/core';
import {
  changeAmount,
  setWallet,
  setProvider,
  pullWallets,
  retrieveListPaymentProviders,
  topup,
  resetTopup,
  calculateCommission,
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
  resetTopup,
  calculateCommission,
  reset
}))
export default class TopUp extends Component {

  state = {
    ready: false,
    activeStep: 0,
    isFinish: false
  }

  componentDidMount() {
    this.initialState();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  initialState = () => {
    const { cardId } = this.props;

    this.props.pullWallets(cardId)
      .then(() => {})
      .catch(() => this.setState({ errorText: 'Ошибочка' }))
      .finally(() => this.setState({ ready: true }));
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

  getSteps = () => [
    'Change transaction type',
    'Calculate commission',
    'Finish'
  ];

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return this.renderFirstStage();
      case 1:
        return this.renderSecondStage();
      case 2:
        return this.renderThirdStage();
      default:
        return 'What is love. Baby dont hurt me, dont hurt me, no more';
    }
  };

  handleNext = () => {
    const { activeStep } = this.state;

    switch (activeStep) {
      case 0:
        this.props.calculateCommission()
          .then(() => this.setState({ activeStep: activeStep + 1 }))
        break;
      case 1:
        this.setState({ isFinish: true, activeStep: activeStep + 2 });
        break;
      default:
        this.setState({ activeStep: activeStep + 1 });
    }
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({ activeStep: activeStep - 1 });
  };

  handleReset = () => {
    this.props.resetTopup();
    this.setState({ activeStep: 0, isFinish: false });
  };

  renderSteps = () => {
    const steps = this.getSteps();
    const { activeStep, isFinish } = this.state;

    return (
      <div className={'card-topup'}>
        <Stepper activeStep={activeStep} alternativeLabel className={'card-topup-header'}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel className={'card-topup-header_label'}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className={'card-topup-container'}>
          <div className={'card-topup-content'}>
            {
              this.getStepContent(isFinish ? activeStep - 1 : activeStep)
            }
          </div>
          <div className={'card-topup-control'}>
            {isFinish ? (
              <div className={'card-topup-control_item'}>
                <MuiButton isLoading={this.props.Card_TopUp.isLoading}>
                  <Button
                    variant={'raised'}
                    color={'secondary'}
                    disabled={this.props.Card_TopUp.isLoading}
                    onClick={this.handleReset}
                    className={'card-topup-control_btn card-topup-control_btn__reset'}
                  >
                    Add more
                  </Button>
                </MuiButton>
              </div>
            ) : (
              <div className={'card-topup-control_item'}>
                {(activeStep !== 0 && activeStep !== (steps.length - 1)) &&
                  <MuiButton isLoading={this.props.Card_TopUp.isLoading}>
                    <Button
                      variant={'raised'}
                      color={'primary'}
                      disabled={this.props.Card_TopUp.isLoading}
                      onClick={this.handleBack}
                      className={'card-topup-control_btn card-topup-control_btn__back'}
                    >
                      Back
                    </Button>
                  </MuiButton>
                }
                <MuiButton isLoading={this.props.Card_TopUp.isLoading}>
                  <Button
                    variant={'raised'}
                    color={'primary'}
                    disabled={
                      this.props.Card_TopUp.isLoading
                      || this.props.Card_TopUp.amount === 0
                      || this.props.Card_TopUp.provider.accountId === ''
                      || this.props.Card_TopUp.txType === ''
                    }
                    onClick={this.handleNext}
                    className={'card-topup-control_btn card-topup-control_btn__next'}
                  >
                    {(activeStep === steps.length - 2) ? 'Submit' : 'Next'}
                  </Button>
                </MuiButton>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  renderLoader = () => <CircularProgress size={24} className={'dashboard_loading'} />;

  renderFirstStage = () => {
    const {
      wallet,
      providers,
      provider,
      isLoading
    } = this.props.Card_TopUp;

    return (
      <Grid container className={'card-topup-wrapper card-topup-form'}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4} className={'card-topup-form_header'}>
              <p>{wallet.name || ''} - {wallet.serial || ''}</p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4} className={'card-topup-form_item'}>
              <FormControl fullWidth>
                <InputLabel htmlFor={'tx-select'}>Transaction type</InputLabel>
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
                <Grid item xs={4} className={'card-topup-form_item'}>
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
                <Grid item xs={4} className={'card-topup-form_item'}>
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

        </Grid>
      </Grid>
    )
  }

  renderSecondStage = () => {
    const { commission } = this.props.Card_TopUp;

    return (
      <Grid container className={'card-topup-wrapper'}>
        <Grid item xs={6}>
          <div>Source amount: <Amount value={commission.sourceAmount} currency={commission.currency.code || 'EUR'} /></div>
          <div>Commission: {commission.commissionAmount}%</div>
          <div>Amount to send: <Amount value={commission.amountToSend} currency={commission.currency.code || 'EUR'} /></div>
        </Grid>
      </Grid>
    );
  };

  renderThirdStage = () => {
    return (
      <Grid container className={'card-topup-wrapper'}>
        <Grid item xs={6}>
          <p>Order ID: 1529958565662</p>
          <p>Payment: CardPay</p>
          <p>Amount to send: 5000 EUR</p>
          <p>Final amount: 19999999 EUR</p>
        </Grid>
      </Grid>
    );
  };

  render() {
    return this.state.ready ? this.renderSteps() : this.renderLoader();
  }
}
