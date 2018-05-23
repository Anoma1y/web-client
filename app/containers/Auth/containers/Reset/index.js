import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopHeader from 'containers/Auth/components/TopHeader';
import FormFooter from 'containers/Auth/components/FormFooter';
import FormReset from './components/FormReset';
import FormOTP from './components/FormOTP';

@connect(state => ({ Auth_Reset: state.Auth_Reset }))
export default class Reset extends Component {

  renderResetHeader = () => {
    return (
      <React.Fragment>
        <h1>Reset</h1>
        <p>Enter the login for password recovery </p>
      </React.Fragment>
    );
  };

  renderConfirmHeader = () => {
    return (
      <React.Fragment>
        <h1>Confirm</h1>
          <p>Please enter the One Time Password (OTP) sent to you {this.props.Auth_Reset.isPhone ? 'mobile number' : 'EMail'}. If you do not receive your OTP within 30 second, please click on the <span className={'auth-form_header__color_blue'}>Resend OTP</span> button and thi will be resent</p>
      </React.Fragment>
    );
  };

  renderFormControl = () => {
    const { otpIsSend } = this.props.Auth_Reset;
    return otpIsSend ? <FormOTP /> : <FormReset />;
  };

  renderHeader = () => {
    const { otpIsSend } = this.props.Auth_Reset;
    return otpIsSend ? this.renderConfirmHeader() : this.renderResetHeader();
  };

  render() {
    return (
      <div className={'reset auth-inner'}>

        <div className={'auth-top'}>

          <TopHeader type={'signup'} />

        </div>

        <form className={'auth-form'} onSubmit={(e) => e.preventDefault()}>

          <div className={'auth-form_header'}>

            {this.renderHeader()}

          </div>

          <div className={'auth-form_content'}>

            {this.renderFormControl()}

          </div>

          <div className={'auth-form_footer'}>

            <FormFooter />

          </div>

        </form>

      </div>
    );
  }
}
