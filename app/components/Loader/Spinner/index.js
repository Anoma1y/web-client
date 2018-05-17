import * as React from 'react';
import classnames from 'classnames';
import { CLASS_NAME } from '../';

export default (props) => {

  const {
    children,
    size = 'sm',
    text = false,
    inline = false
  } = props;

  const classBlockName = 'spinner';

  const classes = classnames(
    `${CLASS_NAME}_${classBlockName}`,
    {
      [`${CLASS_NAME}_${classBlockName}__text`]: text,
      [`${CLASS_NAME}_${classBlockName}__inline`]: inline,
      [`${CLASS_NAME}_${classBlockName}__size_${size}`]: size
    },
  );

  return (
    <div className={classes}> {text && children} </div>
  );
};
