import React, { Component } from 'react';
import TabMenu from './TabMenu';
import TabPanel from './TabPanel';
import './style.scss';

type Props = {
  activeIndex: string | number,
  defaultActiveIndex?: string | number,
  onTabChange: ?Function,
  panes: any // need fix
}

export default class Tab extends Component<Props> {

  renderItems() {
    const { panes, activeIndex } = this.props

    return panes.map((item, index) => {
      return (
        <TabPanel
          key={`${index}_${item.menuItem}`}
          active={index === activeIndex}
        >
          {item.render()}
        </TabPanel>
      );
    });
  }

  handleTabClick = (i: number, e: SyntheticMouseEvent<>) => {
    const { onTabChange } = this.props;
    onTabChange({ activeIndex: i, event: e });
  };

  renderMenu() {
    const { panes, activeIndex } = this.props;

    return panes.map((item, index) => {
      return (
        <TabMenu
          key={item.menuItem}
          activeIndex={index === activeIndex}
          onClick={(e: SyntheticMouseEvent<>) => this.handleTabClick(index, e)}
        >
          {item.menuItem}
        </TabMenu>
      );
    });
  }

  render() {
    return (
      <div className={'tabs'}>
        <div className={'tabs_menu'}>
          {this.renderMenu()}
        </div>
        <div className={'tabs_item'}>
          {this.renderItems()}
        </div>
      </div>
    )
  }
}
