import React, { Component } from 'react';
import TabMenu from './TabMenu';
import './style.scss';

export default class Tab extends Component {

  handleTabClick = (activeIndex, event) => {
    this.props.onTabChange({
      activeIndex, event
    });
  };

  renderItems() {
    const { panes, activeIndex } = this.props
    return (
      <div className={'tab-inner'}>
        {panes[activeIndex].render()}
      </div>
    )
  }

  renderMenu() {
    const { panes, activeIndex } = this.props;
    return panes.map((item, index) => {
      return (
        <TabMenu
          key={item.menuItem}
          activeIndex={index === activeIndex}
          icon={item.icon}
          onClick={(e) => this.handleTabClick(index, e)}
        >
          {item.menuItem}
        </TabMenu>
      );
    });
  }

  render() {
    return (
      <div className={'tabs'}>
        <div className={'tabs-menu'}>
          {this.renderMenu()}
        </div>
        <div className={'tabs-item'}>
          {this.renderItems()}
        </div>
      </div>
    )
  }
}
