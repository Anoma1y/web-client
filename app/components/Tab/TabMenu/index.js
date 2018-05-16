import React from 'react';
import classnames from 'classnames';
import Icon from 'components/Icon';

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
        <Icon icon={'user'} size={16} />
      </div>
      <div className={`${classBlockName}-link`}>
        <p>{children}</p>
      </div>
    </div>
  )
};
