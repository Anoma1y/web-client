import * as React from 'react';3254234
import classnames from 'classnames';
import LabelGroup from './LabelGroup';
import './style.scss';

type Props = {
  attached?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | '',
  disabled?: boolean,
  children?: React.Node,
  type?: 'div' | 'span' | 'a' | 'p',
  className?: string
};

const Label = (props: Props) => {

  const {
    attached = '',
    children,
    className,
    disabled,
    type
  } = props;

  const classBlockName = 'label';

  const classes = classnames(
    classBlockName,
    {
      [`${classBlockName}__disabled`]: disabled,
      [`${classBlockName}__attached ${classBlockName}__attached_${attached}`]: attached,
    },
    className
  );

  const Type = type || 'span';

  return (
    <Type className={classes}>{children}</Type>
  );

};

Label.Group = LabelGroup;

export default Label;
