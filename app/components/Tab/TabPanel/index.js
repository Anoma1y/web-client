import React from 'react';
import classnames from 'classnames';

export default (props) => {

  const {
    active = true,
    children,
    className,
    loading
  } = props;

  const classBlockName = 'tab_item';
  const classes = classnames(
    classBlockName,
    {
      [`${classBlockName}__active`]: active,
      [`${classBlockName}__loading`]: loading
    },
    className
  );

  return (
    <div className={classes}>
      {children}
    </div>
  );

};
