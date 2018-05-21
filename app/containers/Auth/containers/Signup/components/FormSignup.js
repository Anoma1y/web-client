import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Input from 'components/Input';
import Button from 'components/Button';
import SelectList from 'components/SelectList';
import countries from 'lib/countries';
import {
  changeLogin,
  setError,
  changeCountry,
  getOTP
} from '../store/actions'
import {
  transformLoginType,
  validationEmail,
  validationPhone,
  checkIsPhone
} from 'lib/auth';

class FormSignup extends Component {

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
    let error = false;

    if (login.length === 0) {
      this.setState({ loginError: '' });
      return;
    }

    if (checkIsPhone(login)) {
      error = !validationPhone(login);
      this.setState({
        loginError: error ? 'Please enter a valid phone number' : '',
      });
    } else {
      error = !validationEmail(login);
      this.setState({
        loginError: error ? 'Please enter a valid Email' : '',
      });
    }

    this.props.setError(error);
    return !error;

  };

  handleChangeCountry = ({ value }) => {
    this.props.changeCountry(value);
  };

  handleSignUp = () => {
    if (this.props.Auth_Signup.login.length === 0) {
      this.setState({
        loginError: 'Please enter a EMail or phone number',
      });
      return;
    }
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
            icon={'user'}
            iconPosition={'right'}
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
            onChange={this.handleChangeCountry}
          />
        </div>

        <div className={'auth-form_item auth-form_btn'}>
          <Button
            color={'blue'}
            onClick={this.handleSignUp}
            loading={this.props.Auth_Signup.isLoading}
          >
            <span className={'auth-btn_text'}>Submit</span>
          </Button>
        </div>
      </Fragment>
    )
  }
}

export default connect(state => ({ Auth_Signup: state.Auth_Signup }), {
  changeLogin,
  setError,
  changeCountry,
  getOTP
})(FormSignup);
