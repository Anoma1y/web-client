import React, { Component } from 'react';
import Main from './containers/Main';
import Transaction from './containers/Transaction';
import Sidebar from './containers/Sidebar';
import Header from './containers/Header';
import Card from './containers/Card';
import Wallet from './containers/Wallet';
import Profile from './containers/Profile';
import Footer from './containers/Footer';
import {
  Route,
  Switch
} from 'react-router-dom';
import { api } from 'lib/api';
import Storage from 'lib/storage';
import './style.scss';
import { replace } from 'react-router-redux';
import { connect } from 'react-redux';

@connect(null, ({
  replace
}))
class Dashboard extends Component {

  componentDidMount() {
    const authToken = Storage.get('session');
    if (authToken) {
      api.addHeader('Authorization', `TOKEN ${authToken.token}`);
    } else {
      api.removeHeader('Authorization');
      this.props.replace('/auth/signin');
    }
  }

  render() {
    return (
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
            <button onClick={() => {
              api.auth.getUser().then((data) => console.log(data)).catch((err) => console.log(err))
            }}> Get Profile </button>
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
    )
  }
}

export default Dashboard;
