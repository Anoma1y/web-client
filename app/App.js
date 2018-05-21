import React, { Component } from 'react';
import Dashboard from 'containers/Dashboard';
import Auth from 'containers/Auth';
import { Route, Switch } from 'react-router-dom';
import 'lib/style/base.scss';
import './style.scss';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path={'/dashboard'} component={Dashboard} />
        <Route path={'/auth'} component={Auth} />
      </Switch>
    );
  }
}
export default App;

