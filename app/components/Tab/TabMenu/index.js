import React from 'react';
import classnames from 'classnames';

export default (props) => {

  const {
    activeIndex,
    children,
    onClick,
    icon // Компонент иконки
  } = props;

  const classBlockName = 'tabs-menu_item';
  const classes = classnames(
    classBlockName,
    {
      [`${classBlockName}__active`]: activeIndex
    }
  );
  return (
    <div className={classes} onClick={onClick}>
      <div className={`${classBlockName}-icon`}>
        {icon}
      </div>
      <div className={`${classBlockName}-link`}>
        <p className={'tabs-p'}>{children}</p>
      </div>
    </div>
  )
};
