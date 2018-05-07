import * as React from 'react';
import Main from './containers/Main';
import Transaction from './containers/Transaction';
import Sidebar from './containers/Sidebar';
import Header from './containers/Header';
import Footer from './containers/Footer';
import {
  Route,
  Switch
} from 'react-router-dom';
import './style.scss';

type Props = {
  match: {
    url: string
  }
}

const link: Array<{name: string, link: string}> = [
  { name: 'Dashboard', link: '/dashboard/' },
  { name: 'Transactions', link: '/dashboard/transactions/' },
  { name: 'Payments', link: '/dashboard/payments/' },
];

const Dashboard = (props: Props) => (

  <div className={'main'}>

    <div className={'sidebar'}>
      <Sidebar />
    </div>

    <div className={'wrapper'}>

      <div className={'header-wrapper'}>
        <Header item={link} />
      </div>

      <div className={'container'}>

        <Switch>

          <Route exact path={`${props.match.url}`} component={Main} />
          <Route exact path={`${props.match.url}/transaction`} component={Transaction} />

        </Switch>

      </div>

      <div className={'footer-wrapper'}>
        <Footer />
      </div>

    </div>

  </div>
);

export default Dashboard;
