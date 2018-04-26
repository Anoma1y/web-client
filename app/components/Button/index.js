import React from 'react';
import classnames from 'classnames';
import './style.scss';

type Props = {
  children: ?any,
  fluid?: ?boolean,
  color?: 'gray' | 'red' | 'blue' | 'transparent' | 'white' | 'green',
  disabled?: ?boolean,
  inline?: ?boolean,
  name?: ?string,
  floated?: 'left' | 'right' | '',
  onClick?: ({ event: SyntheticMouseEvent<> }) => void,
  size?: 'xs' | 'sm' | 'md' | 'lg',
  className?: ?string
};

export default (props: Props) => {

  const {
    children,
    className,
    disabled,
    name,
    onClick,
    size = 'md',
    inline,
    fluid,
    floated = '',
    color = 'gray'
  } = props;

  const classBlockName = 'button';

  const classes = classnames(
    classBlockName,
    {
      [`${classBlockName}__fluid`]: fluid,
      [`${classBlockName}__disabled`]: disabled,
      [`${classBlockName}__color_${color}`]: color,
      [`${classBlockName}__inline`]: inline,
      [`${classBlockName}__block`]: !inline,
      [`${classBlockName}__size_${size}`]: size,
    },
    floated !== '' ? `${classBlockName}__floated_${floated}` : '',
    className !== '' ? className : ''
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
};
