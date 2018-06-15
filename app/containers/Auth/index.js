import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Reset from './containers/Reset';
import './style.scss';

export default ({ match }) => (

  <div className={'auth'}>

    <div className={'auth-aside'}>
      <div className={'auth_logo'}>

        <a href={'http://www.jago.com/'}>
          <img src={'/static/images/logo-white.png'} alt={'Jago Logo'} />
        </a>

      </div>
    </div>

    <div className={'auth-content'}>
      <div className={'auth_logo__mobile'}>

        <a href={'http://www.jago.com/'}>
          <img src={'/static/images/logo-blue.png'} alt={'Jago Logo Mobile'} />
        </a>

      </div>

      <div className={'auth-container'}>

        <Switch>

          <Route exact path={`${match.url}/signin`} component={Signin} />
          <Route exact path={`${match.url}/signup`} component={Signup} />
          <Route exact path={`${match.url}/reset`} component={Reset} />

        </Switch>

      </div>
    </div>
  </div>
);
