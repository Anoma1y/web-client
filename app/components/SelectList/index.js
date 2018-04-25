import React from 'react';
import classnames from 'classnames';

export default class SelectList extends React.Component<{}> {

  static defaulProps = {
    disabled: false,
    errorMessage: false
  };

  render() {
    const {
      disabled,
      errorMessage,
    } = this.props;

    const classes = classnames(
      'select',
      disabled ? 'select__disabled' : 'disabled__enabled',
      errorMessage ? 'select__errored' : 'select__normal'
    );

    return (
      <div>
        <h1>1</h1>
      </div>
    );
  }
}
