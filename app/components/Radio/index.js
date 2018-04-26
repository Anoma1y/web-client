import React, { Component } from 'react';
import classnames from 'classnames';
import './style.scss';

type Props = {
  checked?: boolean,
  disabled?: boolean,
  id: string,
  name?: string,
  label?: string,
  onChange: ({
    event: SyntheticInputEvent<>,
    checked: boolean,
  }) => void,
  value: string,
  className?: string
};

type State = {
  focused: boolean
};

export default class Radio extends Component<Props, State> {

  static defaultProps = {
    checked: false,
    disabled: false,
    label: ''
  };

  state = {
    focused: false,
  };

  handleChange = (event: SyntheticInputEvent<>) => {
    const { checked } = event.target;
    this.props.onChange({ checked, event });
  };

  handleBlur = () => this.setState({ focused: false });

  handleFocus = () => {
    this.setState({ focused: true });
  };

  render() {
    const {
      label,
      checked,
      disabled,
      id,
      name,
      value,
      className
    } = this.props;

    const classBlockName = 'radio';

    const classes = classnames(
      classBlockName,
      {
        [`${classBlockName}__disabled`]: disabled,
      },
      className
    );
    return (
      <div className={classes}>
        <input
          checked={checked}
          className={classes}
          disabled={disabled}
          id={id}
          name={name}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          type="radio"
          value={value}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    )
  }

}
