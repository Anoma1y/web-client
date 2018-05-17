import React from 'react';
import ReactSVG from 'react-svg';

const Icon = (props) => {

  const {
    name, // Имя иконки
    size // Размер от 0 до разумных пределов
  } = props;

  const classBlockName = 'icon';

  return (
    <ReactSVG
      path={`/static/images/icons/${name}.svg`}
      wrapperClassName={classBlockName}
      style={{
        width: size,
        height: size
      }}
    />
  );
};

export default Icon;
