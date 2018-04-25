import React from 'react';
import classnames from 'classnames';
import './style.scss';

type Props = {
  id?: string,
  name?: string,
  onChange: ({ event: SyntheticInputEvent<>, value: string }) => void,
  options: Array<{
    label: string,
    value: string,
  }>,
  disabled?: boolean,
  placeholder?: string,
  value?: ?string,
  className?: ?string
};

export default class SelectList extends React.Component<Props, {}> {
  static defaultProps = {
    disabled: false,
    options: []
  };

  handleOnChange = (event: SyntheticInputEvent<>) => {
    if (
      event.target instanceof HTMLSelectElement &&
      this.props.value !== event.target.value
    ) {
      this.props.onChange({ event, value: event.target.value });
    }
  };

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
    const classes = classnames(
      'select',
      {
        select__disabled: disabled,
      },
      className !== '' ? className : ''
    );

    return (
      <div>
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
      </div>
    );
  }
}
