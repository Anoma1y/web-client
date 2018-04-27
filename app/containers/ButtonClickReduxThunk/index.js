import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increaseCounter } from './store/actions';
import type { State as ReducerState } from './store/reducer';

type ButtonClickReduxThunkProps = {
  ButtonClickReduxThunk: ReducerState,
  increaseCounter: () => ReduxThunkAction
}

class ButtonClickReduxThunk extends Component<ButtonClickReduxThunkProps, {}> {

  render() {
    return (
      <div>
        <h1>Button click counter via redux (delayed update using redux-thunk)</h1>
        <h3>Button clicked { this.props.ButtonClickReduxThunk.clicks } time(s)</h3>
        <h5>1 second delay</h5>
      </div>
    );
  }
}

export default connect(({ ButtonClickReduxThunk }) => ({ ButtonClickReduxThunk }), {
  increaseCounter
})(ButtonClickReduxThunk);
