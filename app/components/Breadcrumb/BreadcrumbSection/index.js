import * as React from 'react';
import classnames from 'classnames';
import _ from 'lodash';

type Props = {
  active?: boolean,
  children?: React.Node,
  className?: ?string,
  link?: boolean,
  onClick?: () => void,
  href?: string,
  link?: boolean
};

export default class BreadcrumbSection extends React.Component<Props> {
  //
  handleClick = (e: any) => console.log(_.invoke(this.props, 'onClick', e, this.props));

  render() {
    const {
      active = false,
      children,
      className,
      href,
      link = false,
      onClick
    } = this.props;

    const classBlockName = 'breadcrumb_section';

    const classes = classnames(
      classBlockName,
      {
        [`${classBlockName}__active`]: active
      },
      className
    );

    if (onClick) {
      return <div className={classes} onClick={this.handleClick}>{children}</div>;
    }

    if (link || href || !active) {
      return <a href={href} className={classes}> {children} </a>;
    }

    return <div className={classes}>{children}</div>;
  }

}
