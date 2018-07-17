import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Input from 'components/Input';
import Button from 'components/Button';
import {
  Place as PlaceIcon,
  Person as PersonIcon
} from '@material-ui/icons';
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

@connect(({ Auth_Signup }) => ({ Auth_Signup }), {
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
   * Метод обработчик ввода логина
   * При вводе проверяет тип логина (телефон или почта), а также валидируют вводимые символы
   * Разрешены только английские буквы, цифры и "+"  "@"  "."
   * @param e
   */
  handleChangeLogin = (e) => {
    const { value } = e.target;

    if (/[^a-z,A-Z,0-9@.+]/g.test(value)) return;

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
    const { login, country } = this.props.Auth_Signup;
    const checkLogin = validateLogin(login);
    const checkError = checkLogin.error || country.length === 0;

    this.setState({
      loginError: checkLogin.error ? checkLogin.errorText : ''
    });

    this.props.setError(checkError);
    return !checkError;
  };

  /**
   * Переключение страны
   * @param value - код страны
   */
  handleChangeCountry = ({ value }) => {
    const country = value.toUpperCase();

    this.props.changeCountry(country);
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
            placeholder={'Enter your email or phone number'}
            icon={<PersonIcon color={'action'} />}
            iconPosition={'left'}
            required
            error={this.state.loginError}
            errorPosition={'under'}
            value={this.props.Auth_Signup.login}
            onChange={this.handleChangeLogin}
            onBlur={this.handleLoginBlur}
          />

        </div>

        <div className={'auth-form_item'}>

          <SelectList
            options={countries}
            icon={<PlaceIcon color={'action'} />}
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

          {
            this.props.Auth_Signup.errorMessage !== '' &&
            <div className={'auth-form_error'}>
              <span>{this.props.Auth_Signup.errorMessage}</span>
            </div>
          }

        </div>
      </Fragment>
    );
  }
}
