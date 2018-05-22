import React from 'react';
import classnames from 'classnames';
import InputRedux from './InputRedux';
import Icon from 'components/Icon';
import './style.scss';

const Input = (props) => {

  const {
    className,
    icon = '', // Имя иконки
    iconColor = 'gray', // 'blue' | 'darkGray' | 'eggplant' | 'gray' | 'green' | 'lightGray' | 'maroon' | 'midnight' | 'navy' | 'olive' | 'orange' | 'orchid' | 'pine' | 'purple' | 'red' | 'watermelon' | 'white',
    iconSize = 16, // Размер иконки (не трогать!)
    iconPosition = 'right', // 'left' | 'right' | '', Позиция иконки
    size = '', // Размер инпута
    label, // Подпись
    labelPosition, // 'left' | 'right' | '', Позиция лейбла
    transparent, // Без рамок
    floated = '', // Позиционирование блока с инпутом 'left' | 'right' | ''
    error, // Ошибка
    errorPosition = 'under', // 'under' | 'upper', // Позиция ошибки (2 стиля) или слева снизу или справа сверху
    fluid = false, // Инпут на весь размер внутреннего блока
    // Пропы
    disabled, // Инпут дизейбл
    onClick,
    onChange,
    onFocus,
    onBlur,
    placeholder, // плейсхолдер
    name, // имя
    value, // значение
    readOnly, // Только для чтения
    required,
    id, // id
    type = 'text' // тип 'text' | 'email' | 'password'
  } = props;

  const classBlockName = 'input';

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

  const renderIcon = () => {
    return (
      <div className={`${classBlockName}_icon ${String(icon) && `${classBlockName}_icon__position_${iconPosition}`}`}>
        <Icon name={String(icon)} size={iconSize} color={iconColor} />
      </div>
    )
  };

  const renderLabel = (id, labelText) => (
    <label className={`${classBlockName}_label`} htmlFor={id}>{labelText}</label>
  );

  const renderInputBlock = () => {
    const renderInput = () => (
      <input
        className={`${classBlockName}_control`}
        disabled={disabled}
        id={id}
        name={name}
        required={required}
        onBlur={event => onBlur && onBlur(event)}
        onChange={event => onChange && onChange(event)}
        onClick={event => onClick && onClick(event)}
        onFocus={event => onFocus && onFocus(event)}
        placeholder={placeholder}
        readOnly={readOnly}
        type={type}
        value={value}
      />
    );

    const inputClasses = classnames(
      `${classBlockName}_wrapper`,
      {
        [`${classBlockName}_wrapper__icon`]: icon,
        [`${classBlockName}_wrapper__icon-position_${iconPosition}`]: iconPosition
      }
    )

    return (
      <div className={inputClasses}>
        {icon && renderIcon()}
        {renderInput()}
      </div>
    );
  };

  const renderError = (errorMessage, positionError) => {

    const errorClasses = classnames(
      `${classBlockName}_error`,
      {
        [`${classBlockName}_error__${positionError}`]: positionError
      }
    );

    return (
      <div className={errorClasses}>
        <span>{errorMessage}</span>
      </div>
    );

  };

  return (
    <div className={classes}>
      {label && renderLabel(id, label)}
      {renderInputBlock()}
      {error && renderError(error, errorPosition)}
    </div>
  );
};

Input.Redux = InputRedux;

export default Input;
