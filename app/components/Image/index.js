import * as React from 'react';
import classnames from 'classnames';
import './style.scss';

type Props = {
  bordered?: boolean,
  centered?: boolean,
  children?: React.Node,
  className?: string,
  disabled?: boolean,
  floated?: '' | 'left' | 'right',
  fluid?: boolean,
  hidden?: boolean,
  href?: string,
  inline?: boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg' | '',
  src: string,
  verticalAlign?: 'bottom' | 'middle' | 'top' | ''
};

export default (props: Props) => {

  const renderElement = (
    classNames: string,
    href: string,
    children: Function,
    src: string
  ): React.Node => {

    if (href) {
      return (
        <a className={classNames} href={href}>
          {children(src)}
        </a>
      );
    }

    return <div className={classNames}>{children(src)}</div>;
  };

  const renderImage = (src: string): React.Node => {
    return <img src={src} alt={'Pictures'} />;
  };

  const {
    bordered,
    centered,
    className,
    disabled,
    floated = '',
    fluid = false,
    hidden = false,
    href = '',
    inline,
    src,
    size = '',
    verticalAlign = '',
  } = props;

  const classBlockName = 'image';

  const classes = classnames(
    classBlockName,
    verticalAlign !== '' ? `${classBlockName}__vertical-align_${verticalAlign}` : '',
    {
      [`${classBlockName}__size_${size}`]: size,
      [`${classBlockName}__bordered`]: bordered,
      [`${classBlockName}__centered`]: centered,
      [`${classBlockName}__disabled`]: disabled,
      [`${classBlockName}__fluid`]: fluid,
      [`${classBlockName}__hidden`]: hidden,
      [`${classBlockName}__inline`]: inline,
      [`${classBlockName}__size_${size}`]: size,
      [`${classBlockName}__floated_${floated}`]: floated,
    },
    className
  );

  return renderElement(classes, href, renderImage, src);

};
