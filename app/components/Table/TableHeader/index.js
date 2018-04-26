import React from 'react';
import classnames from 'classnames';

type Props = {
  children?: any,
  fullWidth?: boolean,
  className?: string
};

export default function TableHeader(props: Props) {

  const {
    children,
    className = '',
    fullWidth = false
  } = props;

  const classes = classnames(
    'table_header',
    {
      'table_header__size-full-width': fullWidth
    },
    className
  );

  return <thead className={classes}>{children}</thead>;
}
