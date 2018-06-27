import React, { Component } from 'react';
import { replace } from 'react-router-redux';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Main from './containers/Main';
import AddProduct from './containers/AddProduct';
import Transaction from './containers/Transaction';
import Sidebar from './containers/Sidebar';
import Header from './containers/Header';
import Card from './containers/Card';
import Wallet from './containers/Wallet';
import Profile from './containers/Profile';
import Footer from './containers/Footer';
import { CircularProgress } from '@material-ui/core';
import { send } from 'containers/Notification/store/actions';
import {
  pullProfile,
  pullThirdPartyCards,
  pullCard,
  pullWallets
} from './containers/Main/store/actions';
import { api } from 'lib/api';
import Storage from 'lib/storage';
import moment from 'moment';
import './style.scss';
import uuid from 'uuid/v1';

// todo добавить для каждого промисса метод - finally
@connect(({ Dashboard_Main }) => ({ Dashboard_Main }), ({
  pullWallets,
  pullThirdPartyCards,
  pullCard,
  pullProfile,
  send,
  replace,
}))
export default class Dashboard extends Component {

  state = {
    ready: false
  };

  // todo нужен фикс пустого значения сесии
  componentDidMount() {
    const authToken = Storage.get('session');

    // Если токена нету в локальном хранилище, то вызов ошибки
    if (authToken === null) {
      this.handlerError('error', 'Ошибка', 'Произошла непредвиденная ошибка');
      return null;
    }

    // this.props.send({ id: uuid(), status: 'error', title: 'Error', message: 'Error message text', actionClose: true });
    // this.props.send({ id: uuid(), status: 'warning', title: 'Warning', message: 'Warning message text', actionClose: true });
    // this.props.send({ id: uuid(), status: 'info', title: 'Info', message: 'Info message text', actionClose: true });
    // this.props.send({ id: uuid(), status: 'success', title: 'Success', message: 'Success message text', actionClose: true });

    const {
      token, // Токен
      expiresAt // Время смерти токена
    } = authToken;

    // Если время жизни токена истек, то вызов ошибки
    // Иначе вызов промисов для добавления заголовков и инициализации данных
    if (authToken && (moment() < moment(expiresAt))) {
      this.handlerInit(token);
    } else {
      this.handlerError('warning', 'Предупреждение', 'Время сессии истекло')
    }
  }

  /**
   * Метод для добавления загловка Authorization с токеном
   * При удачном выполнении переводит состояние ready в true
   * При неудачном выполнении вызывает ошибку
   * @param token - токен
   */
  handlerInit = (token) => {
    const tokenName = `TOKEN ${token}`;
    const ROLES = {
      individual: [this.props.pullWallets, this.props.pullProfile, this.props.pullThirdPartyCards],
      merchant: [this.props.pullWallets, this.props.pullProfile],
      administrator: [this.props.pullProfile],
      byDefault: [this.props.pullProfile]
    };
    const { role } = Storage.get('members')[0];
    const currentRoleInitialActions = ROLES[role] || ROLES.byDefault;

    api.addHeader('Authorization', tokenName)
      .then(() => {
        Promise.all(currentRoleInitialActions.map((action) => action()))
          .then(() => {

            if (role === 'individual') {
              const { thirdPartyCards } = this.props.Dashboard_Main;
              const pullCardList = thirdPartyCards.map((card) => () => this.props.pullCard(card.cardId));

              Promise.all(pullCardList.map((card) => card()))
                .then(() => this.setState({ ready: true }))
                .catch(() => this.setState({ ready: true }));

            } else {
              this.setState({ ready: true });
            }

          })
          .catch(() => this.setState({ ready: true }));
      })
      .catch(() => this.handlerError('error', 'Ошибка', 'Данные не были загружены'));
  };

  /**
   * Метод для вывода оповещения и ошибки
   * @param status - статус оповещения
   * @param title - заголовок оповещения
   * @param message - сообщение оповещения
   */
  handlerError = (status, title, message) => {
    this.props.send({ id: uuid(), status, title, message, actionClose: true });
    Storage.clear();
    api.removeHeader('Authorization');
    this.props.replace('/auth/signin');
  };

  renderLoader = () => <CircularProgress size={70} className={'page_loading'} />;

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
            <Route exact path={`${this.props.match.url}/card/:id`} component={Card} />
            <Route exact path={`${this.props.match.url}/wallet/:id`} component={Wallet} />
            <Route exact path={`${this.props.match.url}/profile`} component={Profile} />
            <Route exact path={`${this.props.match.url}/transaction`} component={Transaction} />
            <Route path={`${this.props.match.url}/add`} component={AddProduct} />
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
    return this.state.ready ? this.renderDashboard() : this.renderLoader();
  }
}
