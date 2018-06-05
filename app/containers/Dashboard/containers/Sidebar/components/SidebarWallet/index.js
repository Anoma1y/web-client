import React from 'react';
import { connect } from 'react-redux';
import { EuroSymbol as EuroSymbolIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Text from 'components/Text';
import Amount from 'components/Amount';
import Dropdown from 'components/Dropdown';

const menuItems = [
  { name: 'Pay', link: '/wallet/pay' },
  { name: 'Rename', link: '/wallet/rename' },
  { name: 'Delete', link: '/wallet/delete' }
];

const renderEuro = () => (
  <div className={'sidebar-wallet-icon wallet-currency'}>
    <EuroSymbolIcon />
  </div>
);

@connect(state => ({ Dashboard_Sidebar: state.Dashboard_Sidebar }))
export default class SidebarWallet extends React.Component {
  render() {
    const { active } = this.props.Dashboard_Sidebar;

    return (
      <div className={'sidebar-wallets'}>
        {
          this.props.Dashboard_Sidebar.coins.map((item) => {
            const isActive = active.id === item.serial && active.type === 'wallet';
            return (
              <div className={`sidebar-wallet sidebar-container ${isActive ? 'sidebar-wallet__active' : ''}`} key={item.serial}>
                <div className={'sidebar-container_icon'}>
                  {renderEuro()}
                </div>
                <div className={'sidebar-wallet-content sidebar-container_content'}>
                  <Link to={`/dashboard/wallet/${item.serial}`}>
                    <Text className={'sidebar-wallet-amount'}>
                      <Text.Content className={'sidebar-wallet-amount_name'}>
                        {item.name}
                      </Text.Content>
                      <Text.Sub className={'sidebar-wallet-amount_value'}>
                        <Amount value={item.amount || 1544575.11} />
                      </Text.Sub>
                    </Text>
                  </Link>
                </div>
                <div className={'sidebar-wallet_btn sidebar-container_btn'}>
                  <Dropdown item={menuItems}>...</Dropdown>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
