import React from 'react';
import classnames from 'classnames';

type Props = {
  activeIndex: boolean,
  children?: any,
  onClick?: Function
};

export default (props: Props) => {

  const {
    activeIndex,
    children,
    onClick,
  } = props;

  const classBlockName = 'tab_menu';
  const classes = classnames(
    classBlockName,
    {
      [`${classBlockName}__active`]: activeIndex
    }
  );

  return <a className={classes} onClick={onClick} >{children}</a>;
};
