import React from 'react';
import classnames from 'classnames';
import { CLASS_NAME } from '../index';
import './style.scss';

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

  const classBlockName = `${CLASS_NAME}_footer`;

  const classes = classnames(
    classBlockName,
    {
      [`${classBlockName}__size-full-width`]: fullWidth
    },
    className
  );

  return <tfoot className={classes}>{children}</tfoot>;
}
