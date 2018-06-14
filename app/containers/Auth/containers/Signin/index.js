import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormSignin from './components/FormSignin';
import FormOTP from './components/FormOTP';
import TopHeader from 'containers/Auth/components/TopHeader';
import FormFooter from 'containers/Auth/components/FormFooter';
import HeaderForm from '../../components/HeaderForm';
import HeaderConfirm from '../../components/HeaderConfirm';

@connect((state) => ({ Auth_Signin: state.Auth_Signin }))
export default class Signin extends Component {

  renderFormControl = () => {
    const { otpIsSend } = this.props.Auth_Signin;
    return otpIsSend ? <FormOTP /> : <FormSignin />;
  };

  renderHeader = () => {
    const {
      otpIsSend,
      isPhone
    } = this.props.Auth_Signin;
    return otpIsSend ? <HeaderConfirm isPhone={isPhone} /> : <HeaderForm title={'Hello! lets get started'} message={'Enter your details below.'} />;
  };

  render() {
    return (
      <div className={'signup auth-inner'}>
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
