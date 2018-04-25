import * as React from 'react';
import './style.scss';

type Props = {
  color?: 'gray',
};

export default function Divider(props: Props) {
  const { color } = props;
  return <hr className={`divider divider__color_${color}`} />;
}
