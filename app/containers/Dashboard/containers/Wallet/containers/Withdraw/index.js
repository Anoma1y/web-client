import React, {
  Component,
  Fragment
} from 'react';
import { connect } from 'react-redux';
import MuiButton from 'components/MuiButton';
import {
  Grid,
  Stepper,
  Step,
  Modal,
  StepLabel,
  CircularProgress,
  Button,
} from '@material-ui/core';
import {
  Close as CloseIcon,
  Done as DoneIcon,
} from '@material-ui/icons';
import Type from './components/Type';
import BOLForm from './components/BOLForm';
import RequestForm from './components/RequestForm';
import Finish from './components/Finish';
import { send } from 'containers/Notification/store/actions';
import {
  requestToWithdraw,
  reset,
} from './store/actions';
import uuid from 'uuid/v1';

@connect(({ form, Dashboard_Wallet, Wallet_Withdraw }) => ({ form, Dashboard_Wallet, Wallet_Withdraw }), ({
  requestToWithdraw,
  reset,
  send,
}))
export default class Withdraw extends Component {

  state = {
    ready: true,
    activeStep: 0,
    isFinish: false,
    modalConfirmOpen: false,
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

  handleOpenConfirmOperationModal = () =>  {
    const {
      WithdrawRequestForm: {
        syncErrors
      }
    } = this.props.form;

    if (syncErrors) {
      this.props.send({ id: uuid(), status: 'warning', title: 'Warning', message: 'Fill in required fields', timeout: 1200 });
      return;
    }

    this.setState({ modalConfirmOpen: true });
  };

  handleConfirmOperation = () => {
    const { activeStep } = this.state;

    this.setState({ modalConfirmOpen: false });
    this.props.requestToWithdraw()
      .then(() => this.setState({ isFinish: true, activeStep: activeStep + 2 }));

  };

  handleCancelOperation = () => {
    this.setState({ modalConfirmOpen: false });
  };

  handleNext = () => {
    const { activeStep } = this.state;

    switch (activeStep) {
      case 0:
        this.setState({ activeStep: activeStep + 1 });
        break;
      case 1:
        this.handleOpenConfirmOperationModal();
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

  renderConfirmModal = () => {
    const { modalConfirmOpen } = this.state;

    return (
      <Modal open={modalConfirmOpen}>
        <div className={'modal-confirm-operation'}>
          <div className={'modal-confirm-operation_wrapper'}>

            <div className={'modal-confirm-operation_header'}>
              <h3>Operation confirmation</h3>
            </div>

            <div className={'modal-confirm-operation_content'}>
              <div className={'modal-confirm-operation_btn'}>
                <Button
                  fullWidth
                  variant={'raised'}
                  color={'primary'}
                  onClick={this.handleConfirmOperation}
                >
                  <DoneIcon />
                  Submit
                </Button>
              </div>
              <div className={'modal-confirm-operation_btn'}>
                <Button
                  fullWidth
                  variant={'raised'}
                  onClick={this.handleCancelOperation}
                >
                  <CloseIcon />
                  Cancel
                </Button>
              </div>
            </div>

          </div>
        </div>
      </Modal>
    );
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
              <Fragment>
                {this.getStepContent(isFinish ? activeStep - 1 : activeStep)}
                {this.renderConfirmModal()}
              </Fragment>
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
