import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import {
  Lock as LockIcon,
  Person as PersonIcon,
  Visibility as VisibilityIcon
} from '@material-ui/icons';
import {
  validateLogin,
  transformLoginType,
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
    passwordInputType: 'password'
  };

  /**
   * Метод тогл вкл/выкл показ пароля
   */
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
    const { login } = this.props.Auth_Signin;

    const checkLogin = validateLogin(login);
    const checkError = checkLogin.error;

    if (checkLogin.error) {
      this.setState({
        loginError: checkLogin.errorText
      });
    } else {
      this.setState({
        loginError: '',
      });
    }

    this.props.setError(checkError);
    return !checkError;

  };

  /**
   * Метод обработчик ввода логина
   * При вводе проверяет тип логина (телефон или почта), а также валидируют вводимые символы
   * Разрешены только английские буквы, цифры и "+"  "@"  "."
   * @param e
   */
  handleChangeLogin = (e) => {
    const { value } = e.target;

    // if (/[^a-z,A-Z,0-9@.+]/g.test(value)) return;

    const login = transformLoginType(value);
    this.props.changeLogin(login);
  };

  /**
   * Метод для вызоыва валидации формы
   */
  handleValidateForm = () => {
    this.validateForm();
  };

  /**
   * Метод обработчик пароля
   * @param e
   */
  handleChangePassword = (e) => {
    const { value } = e.target;
    this.props.changePassword(value);
  };

  /**
   * Метод для вызова метода валидации и при отсутсвии ошибок вызов экшена для входа
   */
  handleSignIn = () => {
    if (this.validateForm()) {
      this.props.signin();
    }
  };

  render() {

    const {
      login,
      password,
      isBlocked,
      isLoading,
      errorMessage
    } = this.props.Auth_Signin;

    return (
      <Fragment>
        <div className={'auth-form_item'}>
          <Input
            type="text"
            placeholder={'Entering EMail or phone number'}
            icon={<PersonIcon color={'action'} />}
            iconPosition={'left'}
            error={this.state.loginError}
            errorPosition={'under'}
            onChange={this.handleChangeLogin}
            onBlur={this.handleValidateForm}
            value={login}
          />
        </div>
        <div className={'auth-form_item'}>
          <Input
            type={this.state.passwordInputType}
            placeholder={'Entering password'}
            icon={<LockIcon color={'action'}/>}
            iconPosition={'left'}
            onChange={this.handleChangePassword}
            value={password}
            className={'auth-form_input__password'}
          />
          <div className={'auth-form_show-password'} onClick={this.showPassword}>
            <VisibilityIcon />
            <span className={'auth-form_show-placeholder'}>Show password</span>
          </div>
        </div>
        <div className={'auth-form_item auth-form_btn'}>
          <Button
            color={'lightblue'}
            onClick={this.handleSignIn}
            disabled={isLoading || isBlocked}
            loading={isLoading}
          >
            <span className={'auth-btn_text'}>Sign in</span>
          </Button>
          {
            errorMessage &&
              <div className={'auth-form_error'}>
                <span>{errorMessage}</span>
              </div>
          }
          <div className={'auth-form_reset-link'}>
            <Link to={'/auth/reset/'}>Forgot password?</Link>
          </div>
        </div>
      </Fragment>
    )
  }
}
