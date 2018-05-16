import React from 'react';
import classnames from 'classnames';
import { CLASS_NAME } from '../index';

export default (props) => {

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
};
