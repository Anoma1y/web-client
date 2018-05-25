import React, { Component } from 'react';
import { replace } from 'react-router-redux';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Main from './containers/Main';
import Transaction from './containers/Transaction';
import Sidebar from './containers/Sidebar';
import Header from './containers/Header';
import Card from './containers/Card';
import Wallet from './containers/Wallet';
import Profile from './containers/Profile';
import Footer from './containers/Footer';
import { CircularProgress } from '@material-ui/core';
import { send } from 'containers/Notification/store/actions';
import { initialData } from './store/actions';
import { api } from 'lib/api';
import Storage from 'lib/storage';
import moment from 'moment';
import './style.scss';
import uuid from 'uuid/v1';

@connect(null, ({
  replace,
  initialData,
  send
}))
class Dashboard extends Component {

  state = {
    ready: false
  };

  componentDidMount() {
    const authToken = Storage.get('session');

    // Если токена нету в локальном хранилище, то вызов ошибки
    if (authToken === null) this.handleError();

    const { token, expiresAt } = authToken;

    // Если время жизни токена истек, то вызов ошибки
    // Иначе вызов промисов для добавления заголовков и инициализации данных
    if (authToken && (moment() < moment(expiresAt))) {
      const tokenName = `TOKEN ${token}`;

      api.addHeader('Authorization', tokenName).then(() => {
        this.props.initialData()
          .then(() => {
            this.setState({ ready: true });
          })
          .catch(() => {
            this.props.send({
              id: uuid(),
              status: 'error',
              title: 'Ошибка',
              message: 'Данные не были загружены',
              actionClose: true
            });
            this.handleError();
          });
      });
    } else {
      this.props.send({
        id: uuid(),
        status: 'warning',
        title: 'Предупреждение',
        message: 'Время сессии истекло',
        actionClose: true
      });
      this.handleError();
    }
  }

  handleError = () => {
    Storage.clear();
    api.removeHeader('Authorization');
    this.props.replace('/auth/signin');
  };

  renderDashboard = () => (
    <div className={'page'}>

      {/* SIDEBAR SECTION */}
      <div className={'page-sidebar'}>
        <Sidebar />
      </div>

      {/* MAIN SECTION */}
      <div className={'page-main'}>

        {/* MAIN SECTION - HEADER */}
        <div className={'header-wrapper'}>
          <Header />
        </div>

        {/* MAIN SECTION - CONTENT */}
        <div className={'content-wrapper'}>
          <Switch>
            <Route exact path={`${this.props.match.url}`} component={Main} />
            <Route exact path={`${this.props.match.url}/card`} component={Card} />
            <Route exact path={`${this.props.match.url}/wallet`} component={Wallet} />
            <Route exact path={`${this.props.match.url}/profile`} component={Profile} />
            <Route exact path={`${this.props.match.url}/transaction`} component={Transaction} />
          </Switch>
        </div>

        {/* MAIN SECTION - FOOTER */}
        <div className={'footer-wrapper'}>
          <Footer />
        </div>
      </div>

    </div>
  );

  render() {
    return (
      <div className={'page'}>
        {
          this.state.ready ? this.renderDashboard()
            : <CircularProgress size={70} className={'page_loading'} />
        }

      </div>
    );
  }
}

export default Dashboard;
