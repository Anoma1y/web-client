import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormOTP from './components/FormOTP';
import FormSignup from './components/FormSignup';
import TopHeader from 'containers/Auth/components/TopHeader';
import FormFooter from 'containers/Auth/components/FormFooter';
import HeaderForm from '../../components/HeaderForm';
import HeaderConfirm from '../../components/HeaderConfirm';

@connect(({ Auth_Signup }) => ({ Auth_Signup }))
export default class Signup extends Component {

  renderFormControl = () => {
    const { otpIsSend } = this.props.Auth_Signup;

    return otpIsSend ? <FormOTP /> : <FormSignup />;
  };

  renderHeader = () => {
    const { otpIsSend } = this.props.Auth_Signup;

    return otpIsSend ? <HeaderConfirm isSignup /> : <HeaderForm title={'Lets get started'} message={'Enter your details below.'} />;
  };

  render() {
    return (
      <div className={'signup auth-inner'}>
        <div className={'auth-top'}>

          <TopHeader type={'signin'} />

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

