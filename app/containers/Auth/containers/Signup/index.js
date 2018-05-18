import * as React from 'react';
import { connect } from 'react-redux';
import Input from 'components/Input';
import Button from 'components/Button';
import SelectList from 'components/SelectList';
import countries from 'lib/countries';
import {
  changeLogin
} from './store/actions';
import {
  transformLoginType
} from 'lib/auth';
import './style.scss';

class Signup extends React.Component {

  handleChangeLogin = (e) => {
    const { value } = e.target;

    this.props.changeLogin(transformLoginType(value));
  }

  render() {
    return (
      <div className={'signup auth-inner'}>

        <form className={'auth-form'} action={'#'}>

          <div className={'auth-form_header'}>

            <h1>Register</h1>
            <p>Enter your details below.</p>

          </div>

          <div className={'auth-form_content'}>

            <div className={'auth-form_item'}>
              <Input
                type="text"
                placeholder={'Entering EMail or phone number'}
                icon={'user'}
                iconPosition={'right'}
                error={false}
                errorPosition={'upper'}
                value={this.props.signup.login}
                onChange={this.handleChangeLogin}
              />
            </div>

            <div className={'auth-form_item'}>
              <SelectList
                options={countries}
              />
            </div>

            <div className={'auth-form_item auth-form_btn'}>
              <Button color={'blue'}>
                <span className={'auth-btn_text'}>Submit</span>
              </Button>
            </div>

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
    )
  }
};

export default connect(state => ({ signup: state.Auth_Signup }), {
  changeLogin
})(Signup);

