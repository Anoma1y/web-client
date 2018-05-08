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

class Dashboard extends React.Component<Props> {

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
          </div>

          {/* MAIN SECTION - CONTENT */}
          <div className={'content-wrapper'}>
            <Switch>
              <Route exact path={`${this.props.match.url}`} component={Main} />
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
