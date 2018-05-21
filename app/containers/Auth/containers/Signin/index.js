import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import FormSignin from './components/FormSignin';

export default class Signin extends Component {

  renderSigninHeader = () => {
    return (
      <Fragment>
        <h1>Hello! lets get started</h1>
        <p>Enter your details below.</p>
      </Fragment>
    );
  };

  render() {
    return (
      <div className={'signup auth-inner'}>

        <div className={'auth-top'}>

          <span className={'auth-top_text'}>Dont have an account?</span>
          <Link className={'auth-top_link'} to={'/auth/signup/'}>Sign Up</Link>

        </div>

        <form className={'auth-form'} onSubmit={(e) => e.preventDefault()}>

          <div className={'auth-form_header'}>

            {this.renderSigninHeader()}

          </div>

          <div className={'auth-form_content'}>
            <FormSignin />
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
