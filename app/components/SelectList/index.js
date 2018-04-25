import React from 'react';
import classnames from 'classnames';

type State = {
  focused: boolean,
  errorIsOpen: boolean,
};

type Props = {|
  options: Array<{
    label: string,
    value: string,
  }>,
|};

export default class SelectList extends React.Component<Props, State> {

  static defaulProps = {
    options: []
  };

  render() {
    const {
      options
    } = this.props;
    const classes = classnames('select');

    return (
      <div>
        <select>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
