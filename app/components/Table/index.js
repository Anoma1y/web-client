import React from 'react';
import classnames from 'classnames';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableHeaderCell from './TableHeaderCell';
import './style.scss';
import { getColumnCount } from 'lib/css_helpers';

export const CLASS_NAME: string = 'table';

type Props = {
  getColumnCount?: typeof getColumnCount,
  children?: any,
  celled?: ?boolean,
  collapsing?: ?boolean,
  definition?: ?boolean,
  fixed?: ?boolean,
  selectable?: ?boolean,
  singleLine?: ?boolean,
  sortable?: ?boolean,
  stackable?: ?boolean,
  striped?: ?boolean,
  structured?: ?boolean,
  unstackable?: ?boolean,
  attached?: ?boolean,
  basic?: ?boolean,
  compact?: ?boolean,
  columns?: ?string | ?number,
  textAlign?: 'left' | 'center' | 'right' | 'justify',
  verticalAlign?: 'bottom' | 'middle' | 'top' | '',
  size?: 'xs' | 'sm' | 'md' | 'lg' | '',
  className?: ?string
};

const Table = (props: Props) => {
  const {
    attached,
    basic,
    celled = true, // Рамка для всех полей
    children,
    className,
    collapsing,
    columns, // Количество колонок, от 1 до 16
    compact,
    definition,
    fixed,
    selectable,
    singleLine,
    size = '', // Размер шрифта
    sortable, // Вкл/Выкл сортировку
    stackable,
    striped,
    structured,
    textAlign = 'left',
    unstackable,
    verticalAlign = '',
  } = props;

  const classBlockName: string = CLASS_NAME;
  const widthClasses: string = getColumnCount(columns);
  const classes = classnames(
    classBlockName,
    `${classBlockName}__align_${textAlign}`,
    verticalAlign !== '' ? `${classBlockName}__vertical-align_${verticalAlign}` : '',
    {
      [`${classBlockName}__celled`]: celled, // +
      [`${classBlockName}__collapsing`]: collapsing,
      [`${classBlockName}__definition`]: definition,
      [`${classBlockName}__fixed`]: fixed, // +
      [`${classBlockName}__selectable`]: selectable,
      [`${classBlockName}__singleLine`]: singleLine, // +
      [`${classBlockName}__sortable`]: sortable,
      [`${classBlockName}__stackable`]: stackable, // ?
      [`${classBlockName}__striped`]: striped, // ?
      [`${classBlockName}__structured`]: structured, // ?
      [`${classBlockName}__unstackable`]: unstackable, // ?
      [`${classBlockName}__attached`]: attached,
      [`${classBlockName}__basic`]: basic,
      [`${classBlockName}__compact`]: compact,
      [`${classBlockName}__size_${size}`]: size
    },
    `${classBlockName}__columns_${widthClasses}`,
    className,
  );

  return (
    <table className={classes}>
      {children}
    </table>
  );
}

Table.Body = TableBody;
Table.Cell = TableCell;
Table.Footer = TableFooter;
Table.Header = TableHeader;
Table.HeaderCell = TableHeaderCell;
Table.Row = TableRow;

export default Table;
