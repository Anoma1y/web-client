import * as React from 'react';
import SidebarUser from './components/SidebarUser';
import SidebarNotification from './components/SidebarNotification';
import './style.scss';

class Sidebar extends React.Component<{}> {
  render() {
    return (
      <div className={'sidebar-content'}>
        <div className={'sidebar-user'}>
          <SidebarUser />
        </div>
        <div className={'sidebar-notification'}>
          <SidebarNotification />
        </div>
      </div>
    );
  }
}

export default Sidebar;
