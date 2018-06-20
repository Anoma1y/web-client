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
export default class Dashboard extends Component {

  state = {
    ready: false
  };

  // todo нужен фикс пустого значения сесии
  componentDidMount() {
    const authToken = Storage.get('session');

    // Если токена нету в локальном хранилище, то вызов ошибки
    if (authToken === null) {
      this.handlerNotification('error', 'Ошибка', 'Произошла непредвиденная ошибка');
      return null;
    }

    const {
      token, // Токен
      expiresAt // Время смерти токена
    } = authToken;

    // Если время жизни токена истек, то вызов ошибки
    // Иначе вызов промисов для добавления заголовков и инициализации данных
    if (authToken && (moment() < moment(expiresAt))) {
      this.handlerInit(token);
    } else {
      this.handlerNotification('warning', 'Предупреждение', 'Время сессии истекло')
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

    api.addHeader('Authorization', tokenName)
      .then(() => this.setState({ ready: true }))
      .catch(() => this.handlerNotification('error', 'Ошибка', 'Данные не были загружены'))
  };

  /**
   * Метод для вывода оповещения и ошибки
   * @param status - статус оповещения
   * @param title - заголовок оповещения
   * @param message - сообщение оповещения
   */
  handlerNotification = (status, title, message) => {
    this.props.send({ id: uuid(), status, title, message, actionClose: true });
    this.handlerError();
  };

  /**
   * Метод для обработки ошибок
   * Очистки локального хранилища, удаления заголовка и редирект на страницу авторизации
   */
  handlerError = () => {
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
            <Route exact path={`${this.props.match.url}/card`} component={Card} />
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
    return (
      <div className={'page'}>
        {
          this.state.ready
            ? this.renderDashboard()
            : this.renderLoader()
        }
      </div>
    );
  }
}
