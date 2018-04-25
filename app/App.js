import React from 'react';
import ButtonClickState from 'containers/ButtonClickState';
import ButtonClickRedux from 'containers/ButtonClickRedux';
import ButtonClickReduxThunk from 'containers/ButtonClickReduxThunk';
import { Route, Link, Switch } from 'react-router-dom';
import './style.scss';

class App extends React.Component<{}> {
  render() {
    return (
      <div className={'App'}>
        <Switch>
          <Route exact path={'/'} component={ButtonClickState} />
          <Route exact path={'/redux'} component={ButtonClickRedux} />
          <Route exact path={'/reduxthunk'} component={ButtonClickReduxThunk} />
        </Switch>
      </div>
    );
  }
}

export default App;
