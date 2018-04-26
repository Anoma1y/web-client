import React from 'react';
import classnames from 'classnames';
import { getColumnCount } from 'lib/css_helpers';

type Props = {
  celled?: ?boolean,
  collapsing?: ?boolean,
  definition?: ?boolean,
  fixed?: ?boolean,
  inverted?: ?boolean,
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
  padded?: ?boolean,
  columns?: ?string | ?number,
  textAlign?: 'left' | 'center' | 'right' | 'justify',
  verticalAlign?: 'bottom' | 'middle' | 'top',
  size?: 'small' | 'large',
  className?: ?string
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
    selectable,
    singleLine,
    size,
    sortable,
    stackable,
    striped,
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
