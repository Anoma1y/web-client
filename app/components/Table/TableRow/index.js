import React from 'react';
import classnames from 'classnames';
import { CLASS_NAME } from '../index';

type Props = {
  active?: boolean,
  children?: any,
  disabled?: boolean,
  error?: boolean,
  fullWidth?: boolean,
  className?: string,
  warning?: boolean,
  textAlign?: 'left' | 'center' | 'right' | 'justify',
  verticalAlign?: 'bottom' | 'middle' | 'top' | '',
};

export default (props: Props) => {

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

  const classBlockName = `${CLASS_NAME}_row`;

  const classes = classnames(
    classBlockName,
    `${classBlockName}__align_${textAlign}`,
    verticalAlign !== '' ? `${classBlockName}__vertical-align_${verticalAlign}` : '',
    {
      [`${classBlockName}__active`]: active,
      [`${classBlockName}__disabled`]: disabled,
      [`${classBlockName}__error`]: error,
      [`${classBlockName}__warning`]: warning,
    },
    className
  );
  return <tr className={classes}>{children}</tr>;
};
