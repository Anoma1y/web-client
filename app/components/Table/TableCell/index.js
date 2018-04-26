import React from 'react';
import classnames from 'classnames';
import { getColumnCount } from 'lib/css_helpers';

type Props = {
  children?: any,
  fullWidth?: boolean,
  className?: string
};

export default function TableCell(props: Props) {

  const {
    active,
    children,
    className,
    collapsing,
    disabled,
    error,
    negative,
    positive,
    selectable,
    singleLine,
    textAlign,
    verticalAlign,
    warning,
    width = 1,
  } = props;

  const classBlockName = 'table__cell';

  const classes = classnames(
    classBlockName,
    `${classBlockName}__align_${textAlign}`,
    {
      [`${classBlockName}__vertical-align_${verticalAlign}`]: verticalAlign,
      [`${classBlockName}_active`]: active,
      [`${classBlockName}_disabled`]: disabled,
      [`${classBlockName}_error`]: error,
      [`${classBlockName}_collapsing`]: collapsing,
      [`${classBlockName}_selectable`]: selectable,
      [`${classBlockName}_negative`]: negative,
      [`${classBlockName}_single-line`]: singleLine,
      [`${classBlockName}_positive`]: positive,
      [`${classBlockName}_warning`]: warning,
    },
    getColumnCount(classBlockName, width, 'wide'),
    className
  );

  return (
    <td className={classes}>
      {children}
    </td>
  )
}
