import React from 'react';
import classnames from 'classnames';

type Props = {
  children?: any,
  className?: string
};

export default function TableBody(props: Props) {

  const {
    children,
    className,
  } = props;

  const classBlockName = 'table_tbody';

  const classes = classnames(
    classBlockName,
    className
  );

  return <tbody className={classes}>{children}</tbody>;
}
