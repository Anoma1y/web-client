import * as React from 'react';
import classnames from 'classnames';

type Props = {
  children: React.Node,
  className?: string
}

export default (props: Props) => {
  const {
    children,
    className
  } = props;
  const classBlockName = 'labels';
  const classes = classnames(
    classBlockName,
    className
  );
  return <div className={classes}>{children}</div>
};
