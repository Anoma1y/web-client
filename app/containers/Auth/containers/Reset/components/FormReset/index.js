import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Person as PersonIcon } from '@material-ui/icons';
import Input from 'components/Input';
import Button from 'components/Button';
import {
  changeLogin,
  setError,
  setIsPhone,
  setIsLoading,
  getOTP
} from '../../store/actions';
import {
  transformLoginType,
  validateLogin
} from 'lib/auth';

@connect((state) => ({ Auth_Reset: state.Auth_Reset }), {
  changeLogin,
  setError,
  setIsPhone,
  setIsLoading,
  getOTP
})
export default class FormReset extends Component {

  state = {
    loginError: ''
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
  handleValidateForm = () => {
    this.validateForm();
  };

  /**
   * Метод для валидации форм
   * @returns {boolean}
   */
  validateForm = () => {
    const { login } = this.props.Auth_Reset;
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
   * Отправка OTP
   */
  handleReset = () => {
    if (this.validateForm()) {
      this.props.getOTP();
    }
  };

  render() {

    const {
      login,
      isLoading,
      errorMessage,
    } = this.props.Auth_Reset;

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
        <div className={'auth-form_item auth-form_btn auth-form_btn__indent_none'}>
          <Button
            color={'lightblue'}
            onClick={this.handleReset}
            loading={isLoading}
          >
            <span className={'auth-btn_text'}>Reset</span>
          </Button>
          {
            errorMessage !== '' &&
            <div className={'auth-form_error'}>
              <span>{errorMessage}</span>
            </div>
          }
        </div>
      </Fragment>
    )
  }
}
