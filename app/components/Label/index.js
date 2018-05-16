import React from 'react';
import classnames from 'classnames';
import './style.scss';

const Label = (props) => {

  const {
    attached = '', // 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | '', примыкания лейбла к ...
    children,
    className,
    backgroundColor = 'lightgray',
    color = 'white',
    disabled,
    type // 'div' | 'span' | 'a' | 'p', тип
  } = props;

  const classBlockName = 'label';

  const classes = classnames(
    classBlockName,
    {
      [`${classBlockName}__disabled`]: disabled,
      [`${classBlockName}__attached ${classBlockName}__attached_${attached}`]: attached,
      [`${backgroundColor}-bgc`]: backgroundColor,
      [`${color}-color`]: color
    },
    className
  );

  const Type = type || 'span';

  return (
    <Type className={classes}>{children}</Type>
  );

};

export default Label;
