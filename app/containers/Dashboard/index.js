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

class Dashboard extends React.Component<Props> {

  render() {
    return (
      <div className={'page'}>

        <div className={'page-sidebar'}>
          <Sidebar />
        </div>

        <div className={'page-main'}>

          <div className={'header-wrapper'}>
            <Header item={link} />
          </div>

          <div className={'content-wrapper'}>

            <Switch>

              <Route exact path={`${this.props.match.url}`} component={Main} />
              <Route exact path={`${this.props.match.url}/transaction`} component={Transaction} />

            </Switch>

          </div>

          <div className={'footer-wrapper'}>
            <Footer />
          </div>

        </div>

      </div>
    )
  }
}

export default Dashboard;
