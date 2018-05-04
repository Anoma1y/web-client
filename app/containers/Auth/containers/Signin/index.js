import * as React from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import './style.scss';

class Signin extends React.Component {
  // const regex = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/gm;
  // if (text.search(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/))
  // if (text.search(/^[+]?(?!0{5})(\d{5})(?!-?0{4})(-?\d{4})?$/))
  // console.log(str.match(regex));

  state = {
    login: '',
    loginPlaceholder: 'Entering email or phone number'
  }

  checkLogin = (v) => {
    // return /^\+7|^7/.test(v); // Проверка если вначале +7/7 для телефона
    // return /^\+\d|^\d|^\+/.test(v);
    // return /^[349]/.test(v) // Проверка если вначале 3 4 9 для телефона
    // return /^[01256]/.test(v); // Проверка если 0 1 2 5 или 6 для логина
    // TODO тест
    let place = 'Entering email or phone number';
    let val = v;
    const testVal = /^[0-9+][^a-zA-Z@_.+-]*$/.test(v);
    if (v.length !== 0) {
      if (testVal) {
        if (!/^\+\d|^\+/.test(v)) {
          val = `+${v}`;
        }
        place = 'Entering phone number';
      } else {
        val = v.replace(/\+/g, '');
        place = 'Entering login';
      }
    }
    this.setState({
      loginPlaceholder: place,
      login: val
    });
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.checkLogin(value);
  };
  render() {
    return (
      <div className={'signin'}>
        <h1>Login</h1>
        <form action="#">
          <Input type={'text'} placeholder={this.state.loginPlaceholder} onChange={this.handleChange} value={this.state.login} />
          <span>{this.state.loginPlaceholder}</span>
          <Input type={'password'} placeholder={'Password'} />
          <Button color={'blue'}> Войти </Button>
        </form>
      </div>
    );
  }
}

export default Signin;
