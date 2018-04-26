import React from 'react';
import classnames from 'classnames';

type Props = {
  children?: React.Node,
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
    'table__header',
    {
      'table__header_size-full-width': fullWidth
    },
    className
  );

  return <thead className={classes}>{children}</thead>;
}
