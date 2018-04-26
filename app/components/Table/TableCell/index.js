import React from 'react';
import classnames from 'classnames';
import { getColumnCount } from 'lib/css_helpers';
import { getCurrencySymbol } from '../../../lib/currency_code';

type Props = {
  active?: boolean,
  collapsing?: boolean,
  disabled?: boolean,
  error?: boolean,
  children?: any,
  selectable?: boolean,
  singleLine?: boolean,
  fullWidth?: boolean,
  textAlign?: 'left' | 'center' | 'right' | 'justify',
  verticalAlign?: 'bottom' | 'middle' | 'top' | '',
  className?: string,
  width?: ?string | ?number,
  warning?: boolean
};

export default function TableCell(props: Props) {

  const {
    active,
    children,
    className,
    collapsing,
    disabled,
    error,
    selectable,
    singleLine,
    textAlign = 'left',
    verticalAlign = '',
    width = 'one',
    warning
  } = props;

  const classBlockName = 'table_cell';
  const widthClasses: string = getColumnCount(width);

  const classes = classnames(
    classBlockName,
    `${classBlockName}__align_${textAlign}`,
    verticalAlign !== '' ? `${classBlockName}__vertical-align_${verticalAlign}` : '',
    {
      [`${classBlockName}_active`]: active,
      [`${classBlockName}_disabled`]: disabled,
      [`${classBlockName}_error`]: error,
      [`${classBlockName}_collapsing`]: collapsing,
      [`${classBlockName}_selectable`]: selectable,
      [`${classBlockName}_single-line`]: singleLine,
      [`${classBlockName}_warning`]: warning,
    },
    `${classBlockName}__wide_${widthClasses}`,
    className
  );

  return (
    <td className={classes}>
      {children}
    </td>
  )
}
