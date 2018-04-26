import React from 'react';
import classnames from 'classnames';

type Props = {
  children?: any,
  sorted?: 'ascending' | 'descending',
  className?: string
};

export default function TableHeaderCell(props: Props) {

  const {
    children,
    className,
    sorted
  } = props

  const classBlockName = 'table-header_cell';

  const classes = classnames(
    classBlockName,
    [`${classBlockName}__sorted_${sorted}`],
    className
  );

  return (
    <th className={classes}>
      {children}
    </th>
  )
}
