import React from 'react';

export default (props) => {
  const { children, className } = props;

  const classBlockName = 'text_content';

  return (
    <div className={`${classBlockName} ${className || ''}`}>
      {children}
    </div>
  );
};
