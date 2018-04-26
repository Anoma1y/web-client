import React from 'react';
import classnames from 'classnames';
import { CLASS_NAME } from '../index';

type Props = {
  children?: any,
  className?: string
};

export default function TableBody(props: Props) {

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
