import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Dashboard from 'containers/Dashboard';
import Auth from 'containers/Auth';
import { Route, Switch } from 'react-router-dom';
import { actions as notifActions, Notifs } from 'redux-notifications';
import 'lib/style/base.scss';
import './style.scss';

const { notifDismiss } = notifActions;

@connect(null, (dispatch) => ({ dispatch }))
export default class App extends Component {

  closeNotification = (id) => {
    this.props.dispatch(notifDismiss(id));
  };

  render() {
    return (
      <Fragment>
        <Switch>
          <Route path={'/dashboard'} component={Dashboard} />
          <Route path={'/auth'} component={Auth} />
        </Switch>
        <Notifs actionLabel={'X'} onActionClick={this.closeNotification} />
      </Fragment>
    );
  }
}
