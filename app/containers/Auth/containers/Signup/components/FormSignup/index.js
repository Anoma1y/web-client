import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Input from 'components/Input';
import Button from 'components/Button';
import SelectList from 'components/SelectList';
import {
  changeLogin,
  setError,
  changeCountry,
  getOTP
} from '../../store/actions';
import countries from 'lib/countries';
import {
  transformLoginType,
  validateLogin,
} from 'lib/auth';

@connect(state => ({ Auth_Signup: state.Auth_Signup }), {
  changeLogin,
  setError,
  changeCountry,
  getOTP
})
export default class FormSignup extends Component {

  state = {
    loginError: '',
  };

  /**
   * Метод для обработки ввода логина и трансформация значения в подходящий формат (телефон или почта)
   * @param e - эвент
   */
  handleChangeLogin = (e) => {
    const { value } = e.target;
    const login = transformLoginType(value);
    this.props.changeLogin(login);
  };

  /**
   * Метод для обработки ошибок после того, как пользователь уберет фокус с инпута
   */
  handleLoginBlur = () => {
    this.validateForm();
  };

  /**
   * Метод для валидации форм
   * @returns {boolean}
   */
  validateForm = () => {
    const { login } = this.props.Auth_Signup;
    const checkLogin = validateLogin(login);
    const checkError = checkLogin.error;

    if (checkLogin.error) {
      this.setState({
        loginError: checkLogin.errorText
      });
    }

    this.props.setError(checkError);
    return !checkError;

  };

  /**
   * Переключение страны
   * @param value - код страны
   */
  handleChangeCountry = ({ value }) => {
    this.props.changeCountry(value);
  };

  /**
   * Обработка функции нажатия кнопки регистрации
   */
  handleSignUp = () => {
    if (this.validateForm()) {
      this.props.getOTP();
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
            required
            error={this.state.loginError}
            errorPosition={'upper'}
            value={this.props.Auth_Signup.login}
            onChange={this.handleChangeLogin}
            onBlur={this.handleLoginBlur}
          />
        </div>

        <div className={'auth-form_item'}>
          <SelectList
            options={countries}
            icon={'location-gray'}
            iconPosition={'left'}
            iconSize={18}
            placeholder={'Country'}
            required
            onChange={this.handleChangeCountry}
          />
        </div>

        <div className={'auth-form_item auth-form_btn'}>
          <Button
            color={'lightblue'}
            onClick={this.handleSignUp}
            loading={this.props.Auth_Signup.isLoading}
          >
            <span className={'auth-btn_text'}>Sign Up</span>
          </Button>
        </div>
      </Fragment>
    );
  }
}
