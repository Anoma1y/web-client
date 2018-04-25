import React from 'react';
import './style.scss';

type Props = {
  size?: 'xs' | 'sm' | 'md' | 'lg',
  src?: string
};

export default function Avatar(props: Props) {
  const sizes = {
    xs: 12,
    sm: 24,
    md: 40,
    lg: 72,
  };

  const {
    size = 'sm',
    src = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/User_font_awesome.svg'
  } = props;

  const width = size ? sizes[size] : '100%';
  const height = size ? sizes[size] : '';

  return (
    <div className="avatar" style={{ width, height }}>
      <img className="avatar__img" src={src} />
    </div>
  );
}
