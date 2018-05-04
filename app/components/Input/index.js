import * as React from 'react';
import classnames from 'classnames';
import InputRedux from './InputRedux';
import Icon from 'components/Icon';
import './style.scss';

type Props = {
  fluid?: ?boolean, // Инпут будет занимать весь блок
  icon?: ?string, // Имя иконки
  iconColor?: 'blue' | 'darkGray' | 'eggplant' | 'gray' | 'green' | 'lightGray' | 'maroon' | 'midnight' | 'navy' | 'olive' | 'orange' | 'orchid' | 'pine' | 'purple' | 'red' | 'watermelon' | 'white', // Цвет иконки
  iconSize?: number, // Размер иконки (не трогать!)
  iconPosition?: 'left' | 'right' | '', // Позиция иконки
  disabled?: boolean, // Инпут дизейбл
  readOnly?: boolean, // Только для чтения
  label?: ?string, // Подпись
  error?: string, // Ошибка
  errorPosition?: 'under' | 'upper', // Позиция ошибки (2 стиля) или слева снизу или справа сверху
  labelPosition?: 'left' | 'right' | '',
  floated?: 'left' | 'right' | '', // Позиционирование блока с инпутом
  placeholder?: string, // Плейсхолдер
  onClick?: ({ event: SyntheticMouseEvent<> }) => void, // Обработчики
  onChange?: ({ event: SyntheticMouseEvent<> }) => void,
  onFocus?: ({ event: SyntheticMouseEvent<> }) => void,
  onBlur?: ({ event: SyntheticMouseEvent<> }) => void,
  size?: 'xs' | 'sm' | 'md' | 'lg' | '', // Размер
  transparent?: boolean, // Без рамок
  className?: ?string,
  type?: 'text' | 'email' | 'password', // Тип
  id?: string, // Айди
  name?: string, // Имя
  value?: string // Значение
};

// TODO провести рефакторинг этой хуйни
const Input = (props: Props) => {

  const {
    className,
    icon = '',
    iconColor = 'gray',
    iconSize = 16,
    iconPosition = 'right',
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

  const renderIcon = (): React.Node => {
    return (
      <div className={`${classBlockName}_icon ${String(icon) && `${classBlockName}_icon__position_${iconPosition}`}`}>
        <Icon icon={String(icon)} size={iconSize} color={iconColor} />
      </div>
    )
  };

  const renderLabel = (id?, labelText: string): React.Node => (
    <label className={`${classBlockName}_label`} htmlFor={id}>{labelText}</label>
  );

  const renderInputBlock = (): React.Node => {
    const renderInput = () => (
      <input
        className={`${classBlockName}_control`}
        disabled={disabled}
        id={id}
        name={name}
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
