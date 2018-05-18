import * as React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import './style.scss';

const Auth = (props) => (

  <div className={'auth'}>

    <div className={'auth-aside'}>

      <div className={'auth-container'}>

      </div>

    </div>

    <div className={'auth-content'}>

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
