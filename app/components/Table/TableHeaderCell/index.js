import React from 'react';
import classnames from 'classnames';
import { CLASS_NAME } from '../index';
import { getColumnCount } from '../../../lib/css_helpers';

type Props = {
  children?: any,
  sorted?: 'asc' | 'desc' | '',
  className?: string,
  width?: ?number | ?string
};

export default (props: Props) => {

  const {
    children,
    className,
    sorted = '',
    width
  } = props;

  const classBlockName = `${CLASS_NAME}_cell`;
  const widthClasses: string = getColumnCount(width);

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
