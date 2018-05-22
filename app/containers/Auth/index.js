import * as React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Notification from 'containers/Notification';
import './style.scss';

const Auth = (props) => (

  <div className={'auth'}>
    <Notification />
    <div className={'auth-aside'}>
      <div className={'auth_logo'}>
        <a href="http://www.jago.com/">
          <img src="/static/images/logo-white.png" alt="Jago Logo" />
        </a>
      </div>
    </div>

    <div className={'auth-content'}>
      <div className={'auth_logo__mobile'}>
        <a href="http://www.jago.com/">
          <img src="/static/images/logo-blue.png" alt="Jago Logo Mobile" />
        </a>
      </div>
      <div className={'auth-container'}>

        <Switch>

          <Route exact path={`${props.match.url}/signin`} component={Signin} />
          <Route exact path={`${props.match.url}/signup`} component={Signup} />

        </Switch>

      </div>

    </div>

  </div>
);

export default Auth;
