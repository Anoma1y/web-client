import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopHeader from 'containers/Auth/components/TopHeader';
import FormFooter from 'containers/Auth/components/FormFooter';
import FormReset from './components/FormReset';
import FormOTP from './components/FormOTP';
import HeaderForm from '../../components/HeaderForm';
import HeaderConfirm from '../../components/HeaderConfirm';

@connect(state => ({ Auth_Reset: state.Auth_Reset }))
export default class Reset extends Component {

  renderFormControl = () => {
    const { otpIsSend } = this.props.Auth_Reset;
    return otpIsSend ? <FormOTP /> : <FormReset />;
  };

  renderHeader = () => {
    const { otpIsSend, isPhone } = this.props.Auth_Reset;
    return otpIsSend ? <HeaderConfirm isPhone={isPhone} /> : <HeaderForm title={'Reset'} message={'Enter the login for password recovery'} />;
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
