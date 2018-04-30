import * as React from 'react';
import classnames from 'classnames';
import { childrenCheck } from 'lib/children_utils';
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

// TODO потестить
export default (props: Props) => {

  const renderImage = (src: string): React.Node => {
    return <img src={src} alt={'Pictures'} />;
  };

  const renderElement = (
    classNames: string,
    href: string,
    children: React.Node,
    src: string
  ): React.Node => {

    const childrenIsNull = childrenCheck(children);

    if (href) {
      return (
        <a className={classNames} href={href}>
          {childrenIsNull ? renderImage(src) : children}
        </a>
      );
    }

    return <div className={classNames}>{childrenIsNull ? renderImage(src) : children}</div>;
  };

  const {
    bordered, // Рамка вокруг картинки
    centered,
    className,
    disabled, // дизейбл
    children,
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

  return renderElement(classes, href, children, src);

};
