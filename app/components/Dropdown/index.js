import * as React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import './style.scss';

type Props = {
  children: React.Node,
  item: Array<{
    name: string,
    link: string
  }>,
  className?: string
};

type State = {
  active: boolean,
  isClose: boolean,
}
// TODO добавить айди для ссылок

export default class Dropdown extends React.Component<Props, State> {

  state = {
    active: false,
    isClose: false
  };

  handleChange = () => {
    this.setState({
      active: !this.state.active,
      isClose: false
    });
  };

  componentDidMount() {
    (document.addEventListener: Function)('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    (document.removeEventListener: Function)('mousedown', this.handleClickOutside);
  }

  setWrapperRef = (node: ?HTMLDivElement) => {
    this.wrapperRef = node;
  };

  wrapperRef: ?any;

  handleClickOutside = (event: SyntheticEvent<HTMLButtonElement>) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        isClose: true,
        active: false
      });
    }
  };

  render() {
    const {
      children,
      className,
      item
    } = this.props;
    const classBlockName: string = 'dropdown';
    const classes: string = classnames(
      classBlockName,
      {
        [`${classBlockName}__active`]: this.state.active && !this.state.isClose
      },
      className
    );

    return (
      <div className={classes} ref={this.setWrapperRef}>
        <span onClick={this.handleChange}>{children}</span>
        <ul>
          {
            item.map((item) => {
              return (
                <Link to={item.link} key={item.name}>
                  <li>{item.name}</li>
                </Link>
              );
            })
          }
        </ul>
      </div>
    );
  }
}
