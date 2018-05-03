import * as React from 'react';
import Main from './containers/Main';
import Transaction from './containers/Transaction';
import Sidebar from './containers/Sidebar';
import Header from './containers/Header';
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

const Dashboard = (props: Props) => (

  <div className={'main'}>

    <div className={'sidebar'}>
      <Sidebar />
    </div>

    <div className={'wrapper'}>

      <div className={'header-wrapper'}>
        <Header />
      </div>

      <div className={'container'}>

        <Switch>

          <Route exact path={`${props.match.url}`} component={Main} />
          <Route exact path={`${props.match.url}/transaction`} component={Transaction} />

        </Switch>

      </div>

      <div className={'footer'}>I am footer</div>

    </div>

  </div>
);

export default Dashboard;
