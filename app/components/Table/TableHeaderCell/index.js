import React from 'react';
import classnames from 'classnames';
import { CLASS_NAME } from '../index';

type Props = {
  children?: any,
  sorted?: 'ascending' | 'descending' | '',
  className?: string
};

export default (props: Props) => {

  const {
    children,
    className,
    sorted = ''
  } = props

  const classBlockName = `${CLASS_NAME}-header_cell`;

  const classes = classnames(
    classBlockName,
    {
      [`${classBlockName}__sorted_${sorted}`]: sorted !== ''
    },
    className
  );

  return (
    <th className={classes}>
      {children}
    </th>
  )
};
