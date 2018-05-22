import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import {
  validateLogin,
  transformLoginType,
  validatePassword
} from 'lib/auth';
import {
  changeLogin,
  changePassword,
  setError,
  signin
} from '../../store/actions';

@connect(state => ({ Auth_Signin: state.Auth_Signin }), {
  changeLogin,
  changePassword,
  setError,
  signin,
})
export default class FormSignin extends Component {

  state = {
    loginError: '',
    passwordError: '',
    passwordInputType: 'password'
  };

  showPassword = () => {
    const { passwordInputType } = this.state;
    this.setState({
      passwordInputType: passwordInputType === 'password' ? 'text' : 'password'
    });
  };

  /**
   * Метод для валидации форм
   * @returns {boolean}
   */
  validateForm = () => {
    const { login, password } = this.props.Auth_Signin;

    const checkLogin = validateLogin(login);
    const checkPassword = validatePassword(password);
    const checkError = checkPassword.error || checkLogin.error;

    if (checkLogin.error) {
      this.setState({
        loginError: checkLogin.errorText
      });
    } else {
      this.setState({
        loginError: '',
      });
    }

    if (checkPassword.error) {
      this.setState({
        passwordError: checkPassword.errorText
      });
    } else {
      this.setState({
        passwordError: '',
      });
    }

    this.props.setError(checkError);
    return !checkError;

  };

  handleChangeLogin = (e) => {
    const { value } = e.target;
    const login = transformLoginType(value);
    this.props.changeLogin(login);
  };

  handleValidateForm = () => {
    this.validateForm();
  };

  handleChangePassword = (e) => {
    const { value } = e.target;
    this.props.changePassword(value);
  };

  handleSignIn = () => {
    if (this.validateForm()) {
      this.props.signin();
    }
  };

  render() {
    return (
      <Fragment>
        <div className={'auth-form_item'}>
          <Input
            type="text"
            placeholder={'Entering EMail or phone number'}
            icon={'user-gray'}
            iconPosition={'left'}
            error={this.state.loginError}
            errorPosition={'under'}
            onChange={this.handleChangeLogin}
            onBlur={this.handleValidateForm}
            value={this.props.Auth_Signin.login}
          />
        </div>
        <div className={'auth-form_item'}>
          <Input
            type={this.state.passwordInputType}
            placeholder={'Entering password'}
            icon={'lock-gray'}
            iconPosition={'left'}
            error={this.state.passwordError}
            errorPosition={'under'}
            onChange={this.handleChangePassword}
            onBlur={this.handleValidateForm}
            value={this.props.Auth_Signin.password}
            className={'auth-form_input__password'}
          />
          <div className={'auth-form_show-password'} onClick={this.showPassword}>
            <svg viewBox="0 0 512 512"><path d="M320,256a64,64,0,1,1-64-64A64.07,64.07,0,0,1,320,256Zm189.81,9.42C460.86,364.89,363.6,426.67,256,426.67S51.14,364.89,2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.14,147.11,148.4,85.33,256,85.33s204.86,61.78,253.81,161.25A21.33,21.33,0,0,1,509.81,265.42ZM362.67,256A106.67,106.67,0,1,0,256,362.67,106.79,106.79,0,0,0,362.67,256Z" />
            </svg>
            <span className={'auth-form_show-placeholder'}>Show password</span>
          </div>
        </div>
        <div className={'auth-form_item auth-form_btn'}>
          <Button
            color={'lightblue'}
            onClick={this.handleSignIn}
            loading={this.props.Auth_Signin.isLoading}
          >
            <span className={'auth-btn_text'}>Sign in</span>
          </Button>
          <div className={'auth-form_reset-link'}>
            <Link to={'/auth/reset/'}>Forgot password?</Link>
          </div>
        </div>
      </Fragment>
    )
  }
}
