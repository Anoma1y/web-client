import * as React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import './style.scss';

export default class Dropdown extends React.Component {

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
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  handleClickOutside = (event) => {
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
      item //   item: Array<{name: string, link: string }>,
    } = this.props;
    const classBlockName = 'dropdown';
    const classes = classnames(
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
