import React from 'react';
import classnames from 'classnames';
import { CLASS_NAME } from '../index';

export default function TableBody(props) {

  const {
    children,
    className,
  } = props;

  const classBlockName = `${CLASS_NAME}_body`;

  const classes = classnames(
    classBlockName,
    className
  );

  return <tbody className={classes}>{children}</tbody>;
}
