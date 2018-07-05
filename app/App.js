import React, { Fragment } from 'react';
import Dashboard from 'containers/Dashboard';
import Auth from 'containers/Auth';
import { Route, Switch } from 'react-router-dom';
import Notification from 'containers/Notification';
import NotFound from 'containers/404';
import 'lib/style/base.scss';
import './style.scss';

export default () => (
  <Fragment>
    <Notification />
    <Switch>
      <Route path={'/dashboard'} component={Dashboard} />
      <Route path={'/auth'} component={Auth} />
      <Route component={NotFound} />
    </Switch>
  </Fragment>
)
