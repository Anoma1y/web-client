import React, { Component } from 'react';
import classnames from 'classnames';
import './style.scss';

export default class SelectList extends Component {
  static defaultProps = {
    disabled: false,
    options: []
  };

  handleOnChange = (event) => {
    const { target: { value } } = event;
    if (
      event.target instanceof HTMLSelectElement &&
      this.props.value !== value
    ) {
      this.props.onChange({ event, value });
    }
  };

  // options: Array<{
  //   label: string,
  //   value: string,
  // }>,

  render() {
    const {
      id,
      name,
      options,
      disabled,
      placeholder,
      value,
      className
    } = this.props;

    const classBlockName = 'select';

    const classes = classnames(
      classBlockName,
      {
        [`${classBlockName}__disabled`]: disabled,
      },
      className !== '' ? className : ''
    );

    return (
      <select
        id={id}
        name={name}
        disabled={disabled}
        onChange={this.handleOnChange}
        value={value}
        className={classes}
      >
        {placeholder &&
        !value && (
          <option disabled={disabled} value={''} hidden>
            {placeholder}
          </option>
        )}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
}
