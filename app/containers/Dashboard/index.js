import * as React from 'react';
import Main from './containers/Main';
import Transaction from './containers/Transaction';
import Sidebar from './containers/Sidebar';
import {
  Route,
  Switch
} from 'react-router-dom';
import './style.scss';

const Dashboard = ({ match }) => (

  <div className={'main'}>

    <div className={'sidebar'}>
      <Sidebar />
    </div>

    <div className={'wrapper'}>

      <div className={'header'}>I am header</div>

      <div className={'container'}>

        <Switch>

          <Route exact path={`${match.url}`} component={Main} />
          <Route exact path={`${match.url}/transaction`} component={Transaction} />

        </Switch>

      </div>

      <div className={'footer'}>I am footer</div>

    </div>

  </div>
);

export default Dashboard;
