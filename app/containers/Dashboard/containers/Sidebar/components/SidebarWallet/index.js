import React from 'react';
import { connect } from 'react-redux';
import { EuroSymbol as EuroSymbolIcon } from '@material-ui/icons';
import Text from 'components/Text';
import Amount from 'components/Amount';
import Dropdown from 'components/Dropdown';

const menuItems = [
  { name: 'Pay', link: '/wallet/pay' },
  { name: 'Rename', link: '/wallet/rename' },
  { name: 'Delete', link: '/wallet/delete' }
];

const renderEuro = () => (
  <div className={'wallet-icon wallet-currency'}>
    <EuroSymbolIcon />
  </div>
);

@connect(state => ({ Dashboard_Sidebar: state.Dashboard_Sidebar }))
export default class SidebarWallet extends React.Component {
  render() {
    return (
      <div className={'sidebar-wallets'}>
        {
          this.props.Dashboard_Sidebar.coins.map((item) => {
            return (
              <div className={'wallet sidebar-container'} key={item.serial}>
                <div className={'sidebar-container_icon'}>
                  {renderEuro()}
                </div>
                <div className={'wallet-content sidebar-container_content'}>
                  <Text className={'wallet-amount'}>
                    <Text.Content className={'wallet-amount_name'}>
                      {item.name}
                    </Text.Content>
                    <Text.Sub className={'wallet-amount_value'}>
                      <Amount value={item.amount || 1544575.11} />
                    </Text.Sub>
                  </Text>
                </div>
                <div className={'wallet_btn sidebar-container_btn'}>
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
