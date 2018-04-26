import React from 'react';
import classnames from 'classnames';

type Props = {
  active?: boolean,
  children?: any,
  disabled?: boolean,
  error?: boolean,
  fullWidth?: boolean,
  className?: string,
  warning?: boolean
};

export default function TableRow(props: Props) {

  const {
    active,
    children,
    className,
    disabled,
    error,
    textAlign = 'left',
    verticalAlign = '',
    warning,
  } = props;

  const classBlockName = 'table__row';

  const classes = classnames(
    classBlockName,
    `${classBlockName}__align_${textAlign}`,
    verticalAlign !== '' ? `${classBlockName}__vertical-align_${verticalAlign}` : '',
    {
      [`${classBlockName}_active`]: active,
      [`${classBlockName}_disabled`]: disabled,
      [`${classBlockName}_error`]: error,
      [`${classBlockName}_warning`]: warning,
    },
    className
  );
  return <tr className={classes}>{children}</tr>;
}
