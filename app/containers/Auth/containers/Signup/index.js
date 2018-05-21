import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FormOTP from './components/FormOTP';
import FormSignup from './components/FormSignup';

@connect(state => ({ Auth_Signup: state.Auth_Signup }))
export default class Signup extends React.Component {

  renderSignupHeader = () => {
    return (
      <React.Fragment>
        <h1>Register</h1>
        <p>Enter your details below.</p>
      </React.Fragment>
    );
  };

  renderConfirmHeader = () => {
    return (
      <React.Fragment>
        <h1>Confirm</h1>
        <p>Please enter the One Time Password (OTP) sent to you {this.props.Auth_Signup.isPhone ? 'mobile number' : 'EMail'}. If you do not receive your OTP within 30 second, please click on the <span className={'auth-form_header__color_blue'}>Resend OTP</span> button and thi will be resent</p>
      </React.Fragment>
    );
  };

  renderFormControl = () => {
    const { otpIsSend } = this.props.Auth_Signup;
    return otpIsSend ? <FormOTP /> : <FormSignup />;
  };

  renderHeader = () => {
    const { otpIsSend } = this.props.Auth_Signup;
    return otpIsSend ? this.renderConfirmHeader() : this.renderSignupHeader();
  };

  render() {
    return (
      <div className={'signup auth-inner'}>

        <div className={'auth-top'}>

          <span className={'auth-top_text'}>Already have an account?</span>
          <Link className={'auth-top_link'} to={'/auth/signin/'}>Sign In</Link>

        </div>
        <form className={'auth-form'} onSubmit={(e) => e.preventDefault()}>

          <div className={'auth-form_header'}>

            {this.renderHeader()}

          </div>

          <div className={'auth-form_content'}>
            {this.renderFormControl()}
          </div>

          <div className={'auth-form_footer'}>

            <p className={'auth-footer_copyright'}>Copyright © 2018 Jago. All rights reserved.</p>

            <div className={'auth-footer_info'}>

              <span>Terms & Conditions</span>
              <span>Cookie Policy</span>

            </div>

          </div>

        </form>

      </div>
    );
  }
}

