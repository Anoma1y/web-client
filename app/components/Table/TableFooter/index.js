import React from 'react';
import classnames from 'classnames';

type Props = {
  children?: any,
  fullWidth?: boolean,
  className?: string
};

export default function TableFooter(props: Props) {

  const {
    children,
    className = '',
    fullWidth = false
  } = props;

  const classBlockName = 'table_footer';

  const classes = classnames(
    classBlockName,
    {
      [`${classBlockName}__size-full-width`]: fullWidth
    },
    className
  );

  return <tfoot className={classes}>{children}</tfoot>;
}
