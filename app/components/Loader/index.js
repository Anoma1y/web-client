import React from 'react';
import classnames from 'classnames';
import Spinner from './Spinner';
import './style.scss';

export const CLASS_NAME = 'loader';

export default (props) => {
  const {
    active,
    children,
    className,
    inline, // 'centered' или boolean
    transparent,
    size = 'sm', // Размер 'xs' | 'sm' | 'md' | 'lg'
    text
  } = props;

  const classes = classnames(
    CLASS_NAME,
    {
      [`${CLASS_NAME}__active`]: active,
      [`${CLASS_NAME}__inline`]: inline,
      [`${CLASS_NAME}__transparent`]: transparent
    },
    className
  );

  return (
    <div className={classes}>
      <Spinner active={active} size={size} inline={inline} text={text}>
        {children}
      </Spinner>
    </div>
  );
};
