import React, { Component } from 'react';
import classnames from 'classnames';
import './style.scss';

export default class Radio extends Component {

  static defaultProps = {
    checked: false,
    disabled: false,
    label: ''
  };

  state = {
    focused: false,
  };

  handleChange = (event) => {
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
    );
  }

}
