import React from 'react';
import classnames from 'classnames';

type Props = {
  children?: any,
  fullWidth?: boolean,
  className?: string
};

export default function TableRow(props: Props) {

  const {
    active,
    children,
    className,
    disabled,
    error,
    negative,
    positive,
    textAlign,
    verticalAlign,
    warning,
  } = props

  const classBlockName = 'table__row';

  const classes = classnames(
    classBlockName,
    `${classBlockName}__align_${textAlign}`,
    {
      [`${classBlockName}__vertical-align_${verticalAlign}`]: verticalAlign,
      [`${classBlockName}_active`]: active,
      [`${classBlockName}_disabled`]: disabled,
      [`${classBlockName}_error`]: error,
      [`${classBlockName}_negative`]: negative,
      [`${classBlockName}_positive`]: positive,
      [`${classBlockName}_warning`]: warning,
    },
    className
  );
  return <tr className={classes}>{children}</tr>;
}
