import React from 'react';
import classnames from 'classnames';
import './style.scss';

export default (props) => {

  const {
    children, // Какой либо текст внутри кнопочки, можно вставить ноду
    className, // Дополнительные класс
    disabled = props.loading, // Задизейблить
    name, // Имя
    onClick, // Экшен онклик
    onClickLoading,
    size = 'md', // Размер кнопки
    inline, // Все кнопки будут распологаться друг за другом
    fluid, // Кнопка на весь размер внутреннего блока
    floated = '', // Расположение кнопки внутри блока (слева или справа) left | right
    color = 'gray', // Цвет кнопки gray | red | blue | white | green | lightblue | orange | black
    loading, // Если тру, то будет отображаться лоадер,
    outline
  } = props;

  const classBlockName = 'button';

  const classes = classnames(
    classBlockName,
    {
      [`${classBlockName}__fluid`]: fluid,
      [`${classBlockName}__disabled`]: disabled,
      [`${classBlockName}__color_${color}`]: color,
      [`${classBlockName}__inline`]: inline,
      [`${classBlockName}__size_${size}`]: size,
      [`${classBlockName}__loading`]: loading,
      [`${classBlockName}__outline`]: outline
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
