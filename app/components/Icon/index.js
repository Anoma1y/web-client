import * as React from 'react';
import ReactSVG from 'react-svg';

type Props = {
  icon: string,
  size?: number | string,
};

const Icon = (props: Props) => {

  const {
    icon,
    size
  } = props;

  const classBlockName = 'icon';

  return (
    <ReactSVG
      path={`/static/images/icons/${icon}.svg`}
      wrapperClassName={classBlockName}
      style={{
        width: size,
        height: size
      }}
    />
  );
};

export default Icon;
