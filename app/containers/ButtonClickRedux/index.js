import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExampleButton from 'components/ExampleButton';
import { increaseCounter } from './store/actions';
import type { State as ReducerState } from './store/reducer';

type ButtonClickReduxProps = {
  ButtonClickRedux: ReducerState,
  increaseCounter: () => ReduxAction
}

class ButtonClickRedux extends Component<ButtonClickReduxProps, {}> {
  handleButtonClick = () => {
    this.props.increaseCounter();
  };

  render() {
    return (
      <div>
        <h1>Button click counter via redux</h1>
        <h3>Button clicked { this.props.ButtonClickRedux.clicks } time(s)</h3>
        <ExampleButton
          text={'Click me!'}
          onClick={this.handleButtonClick}
        />
      </div>
    );
  }
}

export default connect(({ ButtonClickRedux }) => ({ ButtonClickRedux }), {
  increaseCounter
})(ButtonClickRedux);
