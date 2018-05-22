import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import FormSignin from './components/FormSignin';
import TopHeader from 'containers/Auth/components/TopHeader';
import FormFooter from 'containers/Auth/components/FormFooter';

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

          <TopHeader type={'signup'} />

        </div>

        <form className={'auth-form'} onSubmit={(e) => e.preventDefault()}>

          <div className={'auth-form_header'}>

            {this.renderSigninHeader()}

          </div>

          <div className={'auth-form_content'}>
            <FormSignin />
          </div>

          <div className={'auth-form_footer'}>

            <FormFooter />

          </div>

        </form>

      </div>
    );
  }
}
