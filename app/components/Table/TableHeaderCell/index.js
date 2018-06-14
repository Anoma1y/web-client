import React from 'react';
import classnames from 'classnames';
import { CLASS_NAME } from '../index';
import { getColumnCount } from 'lib/cssHelpers';

export default (props) => {

  const {
    children,
    className,
    sorted = '', // 'asc' | 'desc' | ''
    width
  } = props;

  const classBlockName = `${CLASS_NAME}_cell`;
  const widthClasses = getColumnCount(width);

  const classes = classnames(
    classBlockName,
    {
      [`${classBlockName}__sorted_${sorted}`]: sorted !== '',
      [`${classBlockName}__sorted`]: sorted !== '',
      [`wide_${widthClasses}`]: width
    },
    className
  );

  return (
    <th className={classes}>
      {children}
    </th>
  );
};
