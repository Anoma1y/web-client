import * as React from 'react';
import classnames from 'classnames';
import './style.scss';

type Props = {
  children?: ?any,
  fluid?: ?boolean,
  icon?: string,
  disabled?: boolean,
  readOnly?: boolean,
  label?: ?string,
  error?: string,
  errorPosition?: 'under' | 'upper',
  labelPosition?: 'left' | 'right' | '',
  floated?: 'left' | 'right' | '',
  placeholder?: string,
  onClick?: ({ event: SyntheticMouseEvent<> }) => void,
  onChange?: ({ event: SyntheticMouseEvent<> }) => void,
  onFocus?: ({ event: SyntheticMouseEvent<> }) => void,
  onBlur?: ({ event: SyntheticMouseEvent<> }) => void,
  size?: 'xs' | 'sm' | 'md' | 'lg' | '',
  transparent?: boolean,
  className?: ?string,
  type?: 'text' | 'email' | 'password',
  id?: string,
  name?: string,
  value?: string
};

type InputProp = {
  +type: 'text' | 'password' | 'email',
  disabled?: boolean,
  readOnly?: boolean,
  onClick?: ({ event: SyntheticMouseEvent<> }) => void,
  onChange?: ({ event: SyntheticMouseEvent<> }) => void,
  onFocus?: ({ event: SyntheticMouseEvent<> }) => void,
  onBlur?: ({ event: SyntheticMouseEvent<> }) => void,
  placeholder?: string,
  id?: string,
  name?: string,
  value?: string,
};

export default (props: Props) => {

  const {
    className,
    icon,
    size = '', // Размер инпута
    label,
    labelPosition,
    transparent,
    floated = '',
    error,
    errorPosition = 'under',
    fluid = false, // Инпут на весь размер внутреннего блока
    // Пропы
    disabled, // Задизейблить
    onClick,
    onChange,
    onFocus,
    onBlur,
    placeholder,
    name,
    value,
    readOnly,
    id,
    type = 'text'
  } = props;

  const classBlockName: string = 'input';

  const classes = classnames(
    classBlockName,
    {
      [`${classBlockName}__fluid`]: fluid,
      [`${classBlockName}__disabled`]: disabled,
      [`${classBlockName}__size_${size}`]: size,
      [`${classBlockName}__labelPosition`]: labelPosition,
      [`${classBlockName}__transparent`]: transparent
    },
    floated !== '' ? `${classBlockName}__floated_${floated}` : '',
    className
  );

  const renderIcon = (icon: string): React.Node => (
    <i className={`${classBlockName}_icon icon_${icon}`}> </i>
  );

  const renderLabel = (id?, labelText: string): React.Node => (
    <label className={`${classBlockName}_label`} htmlFor={id}>{labelText}</label>
  );

  const renderInput = (prop: InputProp): React.Node => (
    <input className={`${classBlockName}_control`} {...prop} />
  );

  const renderError = (errorMessage: string, positionError: string): React.Node => {
    const errorClasses: string = classnames(
      `${classBlockName}_error`,
      {
        [`${classBlockName}_error__${positionError}`]: positionError
      }
    );
    return (
      <div className={errorClasses}>
        <span>{errorMessage}</span>
      </div>
    )
  };

  const prop = {
    disabled,
    onClick,
    onChange,
    onFocus,
    onBlur,
    placeholder,
    name,
    value,
    readOnly,
    id,
    type
  };

  return (
    <div className={classes}>
      {label && renderLabel(id, label)}
      {renderInput(prop)}
      {error && renderError(error, errorPosition)}
    </div>
  );
};
