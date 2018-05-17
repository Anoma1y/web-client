import React from 'react';
import './style.scss';

export default (props) => {

  const {
    color = 'gray'
  } = props;

  return <hr className={`divider divider__color_${color}`} />;
};
