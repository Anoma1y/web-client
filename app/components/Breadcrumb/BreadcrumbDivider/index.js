import React from 'react';
import classnames from 'classnames';

type Props = {
  children?: ?any,
  className?: ?string,
};

export default (props: Props) => {

  const {
    className
  } = props;

  const classBlockName = 'breadcrumb_divider';

  const classes = classnames(
    classBlockName,
    className
  );

  return (
    <div className={classes}> / </div>
  );
};
