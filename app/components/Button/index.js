import React from 'react';
import classnames from 'classnames';
import './style.scss';

type Props = {|
  children: any,
  color?: 'gray' | 'red' | 'blue' | 'transparent' | 'white' | 'green',
  disabled?: boolean,
  inline?: boolean,
  name?: string,
  onClick?: ({ event: SyntheticMouseEvent<> }) => void,
  size?: 'xs' | 'sm' | 'md' | 'lg',
|};

export default function Button(props: Props) {

  const {
    children,
    disabled,
    name,
    onClick,
    size = 'md',
    inline,
    color = 'gray'
  } = props;

  const classBlockName = 'button';

  const classes = classnames(classBlockName,
    {
      [`${classBlockName}__disabled`]: disabled,
      [`${classBlockName}__color_${color}`]: color,
      [`${classBlockName}__inline`]: inline,
      [`${classBlockName}__block`]: !inline,
      [`${classBlockName}__size_${size}`]: size,
    }
  );

  return (
    <button
      className={classes}
      disabled={disabled}
      name={name}
      onClick={event => onClick && onClick({ event })}
    >
      {children}
    </button>
  );
}
