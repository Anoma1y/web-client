import * as React from 'react';
import classnames from 'classnames';
import BreadcrumbSection from './BreadcrumbSection';
import BreadcrumbDivider from './BreadcrumbDivider';
import './style.scss';

type Props = {
  children?: React.Node,
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

  return <div className={classes}>{children}</div>;
};

Breadcrumb.Divider = BreadcrumbDivider;
Breadcrumb.Section = BreadcrumbSection;

export default Breadcrumb;
