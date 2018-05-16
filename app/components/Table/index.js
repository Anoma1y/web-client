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

export const CLASS_NAME = 'table';

const Table = (props) => {

  const {
    attached = '', // Прикрепление таблицы к другим элементам '' | 'top' | 'bottom'
    celled, // Рамка для всех полей
    children,
    className, // Свои классы
    collapsing, // Сжатие таблицы по ширине текста
    columns, // Количество колонок, от 1 до 16
    compact, // Убирает падинги для всего, кроме Header и Footer
    definition, // Удаление стилей Header cell и Footer cell, если используется row cell вместо заголовка
    fixed, // Фиксирование элементов таблицы (запрет изменения при изменении содержимого)
    selectable, // Hover эффект
    size = '', // Размер шрифта
    sortable, // Вкл/Выкл сортировку
    stackable, // Включить стаки колонок
    structured, // Для форматирования структурированых данных
    textAlign = 'left', // Выравнивание текста 'left' | 'center' | 'right' | 'justify'
    unstackable, // Запрет стака
    verticalAlign = '', // Выравнивание по вертикали 'bottom' | 'middle' | 'top' | ''
  } = props;

  const classBlockName = CLASS_NAME;
  const widthClasses = getColumnCount(columns);

  const classes = classnames(
    classBlockName,
    `${classBlockName}__align_${textAlign}`,
    verticalAlign !== '' ? `${classBlockName}__vertical-align_${verticalAlign}` : '',
    attached !== '' ? `${classBlockName}__attached ${classBlockName}__attached_${attached}` : '',
    {
      [`${classBlockName}__celled`]: celled,
      [`${classBlockName}__collapsing`]: collapsing,
      [`${classBlockName}__definition`]: definition,
      [`${classBlockName}__fixed`]: fixed,
      [`${classBlockName}__selectable`]: selectable,
      [`${classBlockName}__sortable`]: sortable,
      [`${classBlockName}__stackable`]: stackable,
      [`${classBlockName}__structured`]: structured,
      [`${classBlockName}__unstackable`]: unstackable,
      [`${classBlockName}__compact`]: compact,
      [`${classBlockName}__size_${size}`]: size,
      [`${classBlockName}__columns_${widthClasses}`]: widthClasses
    },
    className
  );

  return (
    <table className={classes}>
      {children}
    </table>
  );
};

Table.Body = TableBody;
Table.Cell = TableCell;
Table.Footer = TableFooter;
Table.Header = TableHeader;
Table.HeaderCell = TableHeaderCell;
Table.Row = TableRow;

export default Table;
