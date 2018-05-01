import * as React from 'react';

type Props = {
  children?: React.Node,
  className?: string,
}

export default (props: Props) => {
  const { children, className } = props;

  const classBlockName = 'header_sub';

  return (
    <div className={`${classBlockName} ${className || ''}`}>
      {children}
    </div>
  )
};
