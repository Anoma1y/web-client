import React from 'react';
import classnames from 'classnames';
import { childrenCheck } from 'lib/children_utils';
import './style.scss';

export default (props) => {

  const renderImage = (src) => {
    return <img src={src} alt={'Pictures'} />;
  };

  const renderElement = (classNames, href, children, src) => {

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
    floated = '', // 'left' | 'right'
    fluid = false,
    hidden = false,
    href = '',
    inline,
    src,
    verticalAlign = '', // 'bottom' | 'middle' | 'top' | ''
  } = props;

  const classBlockName = 'image';

  const classes = classnames(
    classBlockName,
    verticalAlign !== '' ? `${classBlockName}__vertical-align_${verticalAlign}` : '',
    {
      [`${classBlockName}__bordered`]: bordered,
      [`${classBlockName}__centered`]: centered,
      [`${classBlockName}__disabled`]: disabled,
      [`${classBlockName}__fluid`]: fluid,
      [`${classBlockName}__hidden`]: hidden,
      [`${classBlockName}__inline`]: inline,
      [`${classBlockName}__floated_${floated}`]: floated,
    },
    className
  );

  return renderElement(classes, href, children, src);

};
