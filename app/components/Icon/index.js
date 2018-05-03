import * as React from 'react';
import classnames from 'classnames';
import ReactSVG from 'react-svg';
import './style.scss';

type Props = {
  color?: 'blue' | 'darkGray' | 'eggplant' | 'gray' | 'green' | 'lightGray' | 'maroon' | 'midnight' | 'navy' | 'olive' | 'orange' | 'orchid' | 'pine' | 'purple' | 'red' | 'watermelon' | 'white',
  icon: string,
  inline?: boolean,
  size?: number | string,
};

// TODO изменить цвета или добавить новые + потестить + пофиксить проп size

const Icon = (props: Props) => {

  const {
    color = 'gray',
    icon,
    inline,
    size
  } = props;

  const classBlockName = 'icon';

  const classes = classnames(
    classBlockName,
    {
      [`${classBlockName}__inline`]: inline,
    }
  );

  return (
    <ReactSVG
      path={`/static/images/icons/${icon}.svg`}
      className={`${classBlockName}_svg svg__color_${color}`}
      wrapperClassName={classes}
      style={{
        width: size,
        height: size
      }}
    />
  );
};

export default Icon;
