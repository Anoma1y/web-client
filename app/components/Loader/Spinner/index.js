import * as React from 'react';
import classnames from 'classnames';
import { CLASS_NAME } from '../';
import type { Props as SpinnerProps } from '../';

export default (props: SpinnerProps) => {

  const {
    children,
    size = 'sm',
    text = false
  } = props;

  const classBlockName: string = 'spinner';

  const classes: string = classnames(
    `${CLASS_NAME}_${classBlockName}`,
    {
      [`${CLASS_NAME}_${classBlockName}__text`]: text,
      [`${CLASS_NAME}_${classBlockName}__size_${size}`]: size
    },
  );

  return (
    <div className={classes}> {text && children} </div>
  );
};
