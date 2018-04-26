import React from 'react';
import classnames from 'classnames';
import { getColumnCount } from 'lib/css_helpers';
import { CLASS_NAME } from '../index';

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

export default (props: Props) => {

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
    width,
    warning
  } = props;

  const classBlockName = `${CLASS_NAME}_cell`;
  const widthClasses: string = getColumnCount(width);

  const classes = classnames(
    classBlockName,
    `${classBlockName}__align_${textAlign}`,
    verticalAlign !== '' ? `${classBlockName}__vertical-align_${verticalAlign}` : '',
    {
      [`${classBlockName}__active`]: active,
      [`${classBlockName}__disabled`]: disabled,
      [`${classBlockName}__error`]: error,
      [`${classBlockName}__collapsing`]: collapsing,
      [`${classBlockName}__selectable`]: selectable,
      [`${classBlockName}__single-line`]: singleLine,
      [`${classBlockName}__warning`]: warning,
    },
    `wide_${widthClasses}`,
    className
  );

  return (
    <td className={classes}>
      {children}
    </td>
  )
}
