import * as React from 'react';
import SidebarUser from './components/SidebarUser';
import SidebarNotification from './components/SidebarNotification';
import SidebarWallet from './components/SidebarWallet';
import SidebarCard from './components/SidebarCard';
import ProductAdd from './components/ProductAdd';
import './style.scss';

class Sidebar extends React.Component<{}> {

  render() {
    return (
      <div className={'sidebar sidebar-content'}>

        <div className={'sidebar_item sidebar-user'}>
          <SidebarUser />
        </div>

        <div className={'sidebar_item sidebar-notification'}>
          <SidebarNotification />
        </div>

        <div className={'sidebar_item sidebar-wallets'}>
          <SidebarWallet />
        </div>

        <div className={'sidebar_item sidebar-cards'}>
          <SidebarCard />
        </div>

        <div className={'sidebar_item sidebar-product-add'}>
          <ProductAdd />
        </div>

      </div>
    );
  }
}

export default Sidebar;
