import React from 'react';
import classnames from 'classnames';
import { CLASS_NAME } from '../index';
import { getColumnCount } from '../../../lib/css_helpers';

type Props = {
  children?: any,
  sorted?: 'ascending' | 'descending' | '',
  className?: string,
  width?: ?number | ?string
};

export default (props: Props) => {

  const {
    children,
    className,
    sorted = '',
    width
  } = props

  const classBlockName = `${CLASS_NAME}-header_cell`;
  const widthClasses: string = getColumnCount(width);

  const classes = classnames(
    classBlockName,
    {
      [`${classBlockName}__sorted_${sorted}`]: sorted !== ''
    },
    `wide_${widthClasses}`,
    className
  );

  return (
    <th className={classes}>
      {children}
    </th>
  )
};
