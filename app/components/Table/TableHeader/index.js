import React from 'react';
import classnames from 'classnames';
import { CLASS_NAME } from '../index';

type Props = {
  children?: any,
  fullWidth?: boolean,
  className?: string
};

export default (props: Props) => {

  const {
    children,
    className = '',
    fullWidth = false
  } = props;

  const classBlockName = `${CLASS_NAME}_header`;

  const classes = classnames(
    classBlockName,
    {
      [`${classBlockName}__size-full-width`]: fullWidth
    },
    className
  );

  return <thead className={classes}>{children}</thead>;
}
