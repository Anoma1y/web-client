import React from 'react';
import ButtonClickState from 'containers/ButtonClickState';
import ButtonClickRedux from 'containers/ButtonClickRedux';
import ButtonClickReduxThunk from 'containers/ButtonClickReduxThunk';
import Dashboard from 'containers/Dashboard';
import { Route, Switch } from 'react-router-dom';
import 'lib/style/text.scss';
import 'lib/style/color.scss';
import 'react-datepicker/dist/react-datepicker.css';
import './style.scss';

class App extends React.Component<{}> {
  render() {
    return (
      <Switch>
        <Route exact path={'/'} component={ButtonClickState} />
        <Route path={'/dashboard'} component={Dashboard} />
        <Route exact path={'/redux'} component={ButtonClickRedux} />
        <Route exact path={'/reduxthunk'} component={ButtonClickReduxThunk} />
      </Switch>
    );
  }
}

export default App;

