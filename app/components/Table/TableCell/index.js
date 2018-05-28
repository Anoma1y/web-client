import React from 'react';
import classnames from 'classnames';
import { getColumnCount } from 'lib/cssHelpers';
import { CLASS_NAME } from '../index';

export default (props) => {
  const {
    active,
    children,
    className,
    colSpan = 1,
    collapsing,
    disabled,
    error,
    selectable,
    singleLine,
    textAlign = '', // 'left' | 'center' | 'right' | 'justify' | ''
    verticalAlign = '', // 'bottom' | 'middle' | 'top' | ''
    width, // Ширина ячейки от 1 до 16
    warning
  } = props;

  const classBlockName = `${CLASS_NAME}_cell`;
  const widthClasses = getColumnCount(width);

  const classes = classnames(
    classBlockName,
    textAlign !== '' ? `${CLASS_NAME}__align_${textAlign}` : '',
    verticalAlign !== '' ? `${classBlockName}__vertical-align_${verticalAlign}` : '',
    {
      [`${classBlockName}__active`]: active,
      [`${classBlockName}__disabled`]: disabled,
      [`${classBlockName}__error`]: error,
      [`${classBlockName}__collapsing`]: collapsing,
      [`${classBlockName}__selectable`]: selectable,
      [`${classBlockName}__single-line`]: singleLine,
      [`${classBlockName}__warning`]: warning,
      [`wide_${widthClasses}`]: width
    },

    className
  );

  return (
    <td className={classes} colSpan={colSpan}>
      {children}
    </td>
  );
};
