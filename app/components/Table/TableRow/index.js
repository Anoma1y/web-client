import React from 'react';
import classnames from 'classnames';
import { CLASS_NAME } from '../index';

export default (props) => {

  const {
    active,
    children,
    className,
    date,
    disabled,
    processing,
    error,
    textAlign = '', // 'left' | 'center' | 'right' | 'justify' | ''
    verticalAlign = '', // 'bottom' | 'middle' | 'top' | ''
    warning,
  } = props;

  const classBlockName = `${CLASS_NAME}_row`;

  const classes = classnames(
    classBlockName,
    textAlign !== '' ? `${CLASS_NAME}__align_${textAlign}` : '',
    verticalAlign !== '' ? `${classBlockName}__vertical-align_${verticalAlign}` : '',
    {
      [`${classBlockName}__active`]: active,
      [`${classBlockName}__date`]: date,
      [`${classBlockName}__disabled`]: disabled,
      [`${classBlockName}__processing`]: processing,
      [`${classBlockName}__error`]: error,
      [`${classBlockName}__warning`]: warning,
    },
    className
  );
  return <tr className={classes}>{children}</tr>;
};
