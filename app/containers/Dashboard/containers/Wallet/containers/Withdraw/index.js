import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiButton from 'components/MuiButton';
import {
  Grid,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Button,
} from '@material-ui/core';
import Type from './components/Type';
import BOLForm from './components/BOLForm';
import RequestForm from './components/RequestForm';
import Finish from './components/Finish';
import {
  requestToWithdraw,
  reset,
} from './store/actions';

@connect(({ Dashboard_Wallet, Wallet_Withdraw }) => ({ Dashboard_Wallet, Wallet_Withdraw }), ({
  requestToWithdraw,
  reset,
}))
export default class Withdraw extends Component {

  state = {
    ready: true,
    activeStep: 0,
    isFinish: false,
  }

  componentWillUnmount() {
    this.props.reset();
  }

  getSteps = () => [
    'Select withdraw type',
    'Filling out the data',
    'Finish'
  ];

  getType = (type) => {
    switch (type) {
      case 'BOL':
        return <BOLForm />
      case 'BANK_TRANSFER':
        return <RequestForm />;
      default:
        return null;
    }
  };

  getStepContent = (step) => {
    const { activeType } = this.props.Wallet_Withdraw;

    switch (step) {
      case 0:
        return <Type />;
      case 1:
        return this.getType(activeType);
      case 2:
        return <Finish />;
      default:
        return 'What is love. Baby dont hurt me, dont hurt me, no more';
    }
  };
  handleNext = () => {
    const { activeStep } = this.state;

    switch (activeStep) {
      case 0:
        this.setState({ activeStep: activeStep + 1 });
        break;
      case 1:
        this.props.requestToWithdraw()
          .then(() => this.setState({ isFinish: true, activeStep: activeStep + 2 }));
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
    this.props.reset();
    this.setState({ activeStep: 0, isFinish: false });
  };

  renderLoader = () => <CircularProgress size={24} className={'dashboard_loading'} />;

  renderSteps = () => {
    const steps = this.getSteps();
    const { activeStep, isFinish } = this.state;

    return (
      <div className={'stepper'}>
        <Stepper activeStep={activeStep} alternativeLabel className={'stepper-header'}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel className={'stepper-header_label'}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className={'stepper-container'}>
          <div className={'stepper-content'}>
            {
              this.getStepContent(isFinish ? activeStep - 1 : activeStep)
            }
          </div>
          <div className={'stepper-control'}>
            {isFinish ? (
              <div className={'stepper-control_item'}>
                <MuiButton isLoading={this.props.Wallet_Withdraw.isLoading}>
                  <Button
                    variant={'raised'}
                    color={'secondary'}
                    disabled={this.props.Wallet_Withdraw.isLoading}
                    onClick={this.handleReset}
                    className={'stepper-control_btn stepper-control_btn__reset'}
                  >
                    Add more
                  </Button>
                </MuiButton>
              </div>
            ) : (
              <div className={'stepper-control_item'}>
                {(activeStep !== 0 && activeStep !== (steps.length - 1)) &&
                <MuiButton isLoading={this.props.Wallet_Withdraw.isLoading}>
                  <Button
                    variant={'raised'}
                    color={'secondary'}
                    disabled={this.props.Wallet_Withdraw.isLoading}
                    onClick={this.handleBack}
                    className={'stepper-control_btn stepper-control_btn__back'}
                  >
                    Back
                  </Button>
                </MuiButton>
                }
                <MuiButton isLoading={this.props.Wallet_Withdraw.isLoading}>
                  <Button
                    variant={'raised'}
                    color={'primary'}
                    disabled={
                      this.props.Wallet_Withdraw.isLoading
                      || this.props.Wallet_Withdraw.activeType === null
                      || (this.props.Wallet_Withdraw === 'BANK_TRANSFER' && this.state.activeStep === 1 && (this.props.Wallet_Withdraw.commission.transactionAmount && this.props.Wallet_Withdraw.commission.transactionAmount) !== Number(this.props.Wallet_Withdraw.amount))
                    }
                    onClick={this.handleNext}
                    className={'stepper-control_btn stepper-control_btn__next'}
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

  render() {
    return this.state.ready ? this.renderSteps() : this.renderLoader();
  }
}
