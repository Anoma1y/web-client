import * as React from 'react';
import './style.scss';

type Props = {
  color?: 'gray',
};

export default (props: Props) => {
  const {
    color = 'gray'
  } = props;
  return <hr className={`divider divider__color_${color}`} />;
};
