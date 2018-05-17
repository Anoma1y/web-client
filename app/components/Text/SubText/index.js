import React from 'react';

export default (props) => {
  const { children, className } = props;

  const classBlockName = 'text_sub';

  return (
    <div className={`${classBlockName} ${className || ''}`}>
      {children}
    </div>
  )
};
