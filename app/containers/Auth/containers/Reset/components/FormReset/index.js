import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import Input from 'components/Input';
import Button from 'components/Button';
import {
  changeLogin,
  setError,
  setIsPhone,
  setIsLoading,
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
})
export default class FormReset extends Component {

  state = {
    loginError: ''
  };

  handleChangeLogin = (e) => {
    const { value } = e.target;
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

  handleReset = () => {
    if (this.validateForm()) {
      console.log(1);
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
            value={this.props.Auth_Reset.login}
          />
        </div>
        <div className={'auth-form_item auth-form_btn'}>
          <Button
            color={'lightblue'}
            onClick={this.handleReset}
            loading={this.props.Auth_Reset.isLoading}
          >
            <span className={'auth-btn_text'}>Reset</span>
          </Button>
        </div>
      </Fragment>
    )
  }
}
