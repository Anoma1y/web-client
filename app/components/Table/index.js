import React from 'react';
import classnames from 'classnames';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

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

type Props = {
  celled?: boolean,
  collapsing?: boolean,
  definition?: boolean,
  fixed?: boolean,
  inverted?: boolean,
  selectable?: boolean,
  singleLine?: boolean,
  sortable?: boolean,
  stackable?: boolean,
  striped?: boolean,
  structured?: boolean,
  unstackable?: boolean,
  attached?: boolean,
  basic?: boolean,
  compact?: boolean,
  padded?: boolean,
  textAlign?: 'left' | 'center' | 'right' | 'justify',
  verticalAlign?: 'bottom' | 'middle' | 'top',
  size?: 'small' | 'large',
  className?: string
};

export default function Table(props: Props) {
  const {
    attached,
    basic,
    celled,
    children,
    className,
    collapsing,
    columns,
    compact,
    definition,
    fixed,
    inverted,
    padded,
    renderBodyRow,
    selectable,
    singleLine,
    size,
    sortable,
    stackable,
    striped,
    tableData,
    structured,
    textAlign = 'left',
    unstackable,
    verticalAlign,
  } = props;

  const classBlockName = 'table';

  const classes = classnames(
    classBlockName,
    size,
    `${classBlockName}__align_${textAlign}`,
    {
      [`${classBlockName}__vertical-align_${verticalAlign}`]: verticalAlign,
      [`${classBlockName}__celled`]: celled,
      [`${classBlockName}__collapsing`]: collapsing,
      [`${classBlockName}__definition`]: definition,
      [`${classBlockName}__fixed`]: fixed,
      [`${classBlockName}__inverted`]: inverted,
      [`${classBlockName}__selectable`]: selectable,
      [`${classBlockName}__singleLine`]: singleLine,
      [`${classBlockName}__sortable`]: sortable,
      [`${classBlockName}__stackable`]: stackable,
      [`${classBlockName}__striped`]: striped,
      [`${classBlockName}__structured`]: structured,
      [`${classBlockName}__unstackable`]: unstackable,
      [`${classBlockName}__attached`]: attached,
      [`${classBlockName}__basic`]: basic,
      [`${classBlockName}__compact`]: compact,
      [`${classBlockName}__padded`]: padded,
    },
    getColumnCount(classBlockName, columns, 'column'),
    className,
  );

  return (
    <table className={classes}>
      {children}
    </table>
  );
}
