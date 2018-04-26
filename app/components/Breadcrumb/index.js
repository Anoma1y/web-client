import React from 'react';
import classnames from 'classnames';
import BreadcrumbSection from './BreadcrumbSection';
import BreadcrumbDivider from './BreadcrumbDivider';
import './style.scss';
import Table from '../Table';
import TableCell from '../Table/TableCell';
import TableBody from '../Table/TableBody';
import TableFooter from '../Table/TableFooter';
import TableHeaderCell from '../Table/TableHeaderCell';
import TableRow from '../Table/TableRow';
import TableHeader from '../Table/TableHeader';

type Props = {
  children: ?any,
  className?: ?string,
  size: 'xs' | 'sm' | 'md' | 'lg'
};

const Breadcrumb = (props: Props) => {

  const {
    children,
    className,
    size = 'sm',
  } = props;

  const classBlockName = 'breadcrumb';

  const classes = classnames(
    classBlockName,
    {
      [`${classBlockName}__size_${size}`]: size,
    },
    className
  );

  return <div className={classes}>{children}</div>
};

Breadcrumb.Divider = BreadcrumbDivider;
Breadcrumb.Section = BreadcrumbSection;

export default Breadcrumb;
