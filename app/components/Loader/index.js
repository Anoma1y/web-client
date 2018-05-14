import * as React from 'react';
import classnames from 'classnames';
import Spinner from './Spinner';
import './style.scss';

export const CLASS_NAME = 'loader';

export type Props = {
  active?: boolean,
  children?: React.Node,
  className?: string,
  disabled?: boolean,
  transparent?: boolean,
  text?: boolean,
  inline?: boolean | 'centered',
  size?: 'xs' | 'sm' | 'md' | 'lg'
};

export default (props: Props) => {
  const {
    active,
    children,
    className,
    inline,
    transparent,
    size = 'sm',
    text
  } = props;

  const classes: string = classnames(
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
