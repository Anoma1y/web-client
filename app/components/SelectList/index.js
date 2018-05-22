import React, { Component } from 'react';
import Icon from 'components/Icon';
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
      icon,
      iconPosition = icon ? 'left' : '',
      iconSize = 16,
      disabled,
      placeholder,
      value,
      required,
      className
    } = this.props;

    const classBlockName = 'select';

    const classes = classnames(
      classBlockName,
      {
        [`${classBlockName}__disabled`]: disabled,
        [`${classBlockName}__icon`]: icon,
      },
      className !== '' ? className : ''
    );

    return (
      <div className={classes}>
        {icon &&
          <div className={`${classBlockName}_icon ${String(icon) && `${classBlockName}_icon__position_${iconPosition}`}`}>
            <Icon name={String(icon)} size={iconSize} />
          </div>
        }
        <select
          id={id}
          name={name}
          disabled={disabled}
          onChange={this.handleOnChange}
          value={value}
          defaultValue={''}
          required={required}
        >

          {placeholder &&
          !value && (
            <option hidden disabled value={''}>
              {placeholder}
            </option>
          )}

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
