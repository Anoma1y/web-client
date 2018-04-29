import React from 'react';
import classnames from 'classnames';
import './style.scss';

type Props = {
  children: ?any,
  fluid?: ?boolean,
  color?: 'gray' | 'red' | 'blue' | 'transparent' | 'white' | 'green',
  disabled?: ?boolean,
  inline?: ?boolean,
  name?: ?string,
  floated?: 'left' | 'right' | '',
  onClick?: ({ event: SyntheticMouseEvent<> }) => void,
  size?: 'xs' | 'sm' | 'md' | 'lg',
  className?: ?string,
  loading?: boolean
};

// TODO изменить цвета или добавить новые + потестить онклик
export default (props: Props) => {

  const {
    children, // Какой либо текст внутри кнопочки
    className,
    disabled, // Задизейблить
    name, // Имя
    onClick, // Экшен онклик
    size = 'md', // Размер кнопки
    inline, // Все кнопки будут распологаться друг за другом
    fluid, // Кнопка на весь размер внутреннего блока
    floated = '', // Расположение кнопки внутри блока (слева или справа)
    color = 'gray', // Цвет кнопки
    loading = true // Если тру, то будет отображаться лоадер
  } = props;

  const classBlockName = 'button';

  const classes = classnames(
    classBlockName,
    {
      [`${classBlockName}__fluid`]: fluid,
      [`${classBlockName}__disabled`]: disabled,
      [`${classBlockName}__color_${color}`]: color,
      [`${classBlockName}__inline`]: inline,
      [`${classBlockName}__block`]: !inline,
      [`${classBlockName}__size_${size}`]: size,
      [`${classBlockName}__loading`]: loading
    },
    floated !== '' ? `${classBlockName}__floated_${floated}` : '',
    className
  );

  return (
    <button
      className={classes}
      disabled={disabled}
      name={name}
      onClick={event => onClick && onClick({ event })}
    >{children}
      { loading && <div className="spinner"> </div> }
    </button>
  );
};
