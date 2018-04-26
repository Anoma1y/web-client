import React, { Component } from 'react';
import classnames from 'classnames';
import { getElementType } from 'lib/css_helpers';
import _ from 'lodash';
import './style.scss';

type Props = {
  children?: ?any,
  className?: ?string,
  link?: boolean,
  onClick?: () => void,
};

export default class BreadcrumbSection extends Component<Props> {
  //
  handleClick = e => console.log(_.invoke(this.props, 'onClick', e, this.props));

  computeElementType = () => {
    const { link, onClick } = this.props;
    if (link || onClick) return 'a';
  }

  render() {
    const {
      active = false,
      children,
      className,
      href,
    } = this.props;
    const classBlockName = 'breadcrumb_section';

    const ElementType = getElementType(BreadcrumbSection, this.props, this.computeElementType);
    console.log(ElementType)
    const classes = classnames(
      classBlockName,
      {
        [`${classBlockName}__active`]: active
      },
      className
    );
    return (
      <ElementType className={classes} href={href} onClick={this.handleClick}>
        {children}
      </ElementType>
    )
  }

}
