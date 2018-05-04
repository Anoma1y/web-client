import * as React from 'react';
import './style.scss';

const Signup = () => (

  <div className={'signup'}>
    <h1>Registration</h1>
    <div>
      <label htmlFor="po">Почта</label><input id={'po'} type="text" />
      <label htmlFor="pa">Пароль</label><input id={'pa'} type="password" />
      <label htmlFor="co">Страна</label><input id={'co'} type="text" />
    </div>
  </div>
);

export default Signup;
