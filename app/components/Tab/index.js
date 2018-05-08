// import React, { Component } from 'react';
// import TabMenu from './TabMenu';
// import TabPanel from './TabPanel';
// import './style.scss';
//
// type Props = {
//   activeIndex: string | number,
//   defaultActiveIndex?: string | number,
//   onTabChange?: () => void,
//   panes: any
// }
//
// export default class Tab extends Component<Props> {
//
//   handleTabClick = (index: number, event: SyntheticMouseEvent<>) => {
//     this.props.onTabChange({
//       activeIndex: index, event
//     });
//   };
//
//   renderItems() {
//     const { panes, activeIndex } = this.props
//
//     return panes.map((item, index) => {
//       return (
//         <TabPanel
//           key={`${index}_${item.menuItem}`}
//           active={index === activeIndex}
//         >
//           {item.render()}
//         </TabPanel>
//       );
//     });
//   }
//
//   renderMenu() {
//     const { panes, activeIndex } = this.props;
//
//     return panes.map((item, index) => {
//       return (
//         <TabMenu
//           key={item.menuItem}
//           activeIndex={index === activeIndex}
//           onClick={(e: SyntheticMouseEvent<>) => this.handleTabClick(index, e)}
//         >
//           {item.menuItem}
//         </TabMenu>
//       );
//     });
//   }
//
//   render() {
//     return (
//       <div className={'tabs'}>
//         <div className={'tabs_menu'}>
//           {this.renderMenu()}
//         </div>
//         <div className={'tabs_item'}>
//           {this.renderItems()}
//         </div>
//       </div>
//     )
//   }
// }
