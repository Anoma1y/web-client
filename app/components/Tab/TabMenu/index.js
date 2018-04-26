import React from 'react';
import classnames from 'classnames';

type Props = {
  activeIndex: boolean,
  children?: any,
  handleOnClick?: Function
};

export default (props: Props) => {

  const {
    activeIndex,
    children,
    handleOnClick,
  } = props;

  const classBlockName = 'tab_menu';
  const classes = classnames(
    classBlockName,
    {
      [`${classBlockName}__active`]: activeIndex
    }
  );

  return <a className={classes} onClick={handleOnClick}>{children}</a>;

};
