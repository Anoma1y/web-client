import * as React from 'react';
import SidebarUser from './components/SidebarUser';
import SidebarNotification from './components/SidebarNotification';
import SidebarWallet from './components/SidebarWallet';
import SidebarCard from './components/SidebarCard';
import ProductAdd from './components/ProductAdd';

class Sidebar extends React.Component<{}> {

  render() {
    return (
      <div className={'sidebar-content'}>

        <div className={'aside-user'}>
          <SidebarUser />
        </div>

        <div className={'aside-notification'}>
          <SidebarNotification />
        </div>

        <div className={'aside-wallets'}>
          <SidebarWallet />
        </div>

        <div className={'aside-cards'}>
          <SidebarCard />
        </div>

        <div className={'aside-product-add'}>
          <ProductAdd />
        </div>
      </div>
    );
  }
}

export default Sidebar;
