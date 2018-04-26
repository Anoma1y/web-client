import React from 'react';
import classnames from 'classnames';

type Props = {
  children?: React.Node,
  fullWidth?: boolean,
  className?: string
};

const numberWord = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
};
const numberToWord = (value: string | number): string => {
  if (typeof value === 'string' || typeof value === 'number') {
    return numberWord[value] || value;
  }
  return '';
};
const getColumnCount = (block: string, val: string, widthClass: string = '', canEqual: boolean = false): string => {
  if (canEqual && val === 'equal') {
    return `${block}__column_equal`;
  }
  const valType = typeof val;
  if ((valType === 'string' || valType === 'number') && widthClass) {
    return `${block}__${widthClass}_${numberToWord(val)}`;
  }
  return numberToWord(val);
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
  } = props

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
