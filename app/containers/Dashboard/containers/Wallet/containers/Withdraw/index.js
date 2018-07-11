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

@connect(({ Wallet_Withdraw }) => ({ Wallet_Withdraw }))
export default class Withdraw extends Component {

  state = {
    ready: true,
    activeStep: 0,
    isFinish: false
  }

  componentDidMount() {
    console.log('I am mounting, senpai~')
    // this.initialState();
  }

  componentWillUnmount() {
    console.log('~senpai, watashi o nokosanaide kudasai')
    // this.props.reset();
  }

  getSteps = () => [
    'Select withdraw type',
    'Filling out the data',
    'Finish'
  ];

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return <span>Hi 0</span>;
      case 1:
        return <span>Hi 1</span>;
      case 2:
        return <span>Hi 2</span>;
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

  renderLoader = () => <CircularProgress size={24} className={'dashboard_loading'} />;

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
                <MuiButton isLoading={this.props.Wallet_Withdraw.isLoading}>
                  <Button
                    variant={'raised'}
                    color={'secondary'}
                    disabled={this.props.Wallet_Withdraw.isLoading}
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
                <MuiButton isLoading={this.props.Wallet_Withdraw.isLoading}>
                  <Button
                    variant={'raised'}
                    color={'primary'}
                    disabled={this.props.Wallet_Withdraw.isLoading}
                    onClick={this.handleBack}
                    className={'card-topup-control_btn card-topup-control_btn__back'}
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
                      false
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

  render() {
    return this.state.ready ? this.renderSteps() : this.renderLoader();
  }
}
