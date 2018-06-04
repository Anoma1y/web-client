import React from 'react';
import { Link } from 'react-router-dom';
import Text from 'components/Text';
import Amount from 'components/Amount';
import Icon from 'components/Icon';
import Dropdown from 'components/Dropdown';

const menuItems = [
  { name: 'Pay', link: '/wallet/pay' },
  { name: 'Rename', link: '/wallet/rename' },
];

const renderMasterCard = () => (
  <div className={'sidebar-wallet-icon sidebar-wallet-card'}>
    <Icon name={'mastercard'} size={35} />
  </div>
);

const renderVisa = () => (
  <div className={'sidebar-wallet-icon sidebar-wallet-card'}>
    <Icon name={'visa'} size={35} />
  </div>
);

export default class SidebarCard extends React.Component {
  render() {
    return (
      <div className={'sidebar-wallets'}>

        <div className={'sidebar-wallet sidebar-container'}>
          <div className={'sidebar-container_icon'}>
            {renderMasterCard()}
          </div>
          <div className={'sidebar-wallet-content sidebar-container_content'}>
            <Link to={'/dashboard/card'}>
              <Text className={'sidebar-wallet-amount'}>
                <Text.Content className={'sidebar-wallet-amount_name'}>
                  Master Card **** 6307
                </Text.Content>
                <Text.Sub className={'sidebar-wallet-amount_value'}>
                  <Amount value={23450.52} />
                </Text.Sub>
              </Text>
            </Link>
          </div>
          <div className={'sidebar-wallet_btn sidebar-container_btn'}>
            <Dropdown item={menuItems}>...</Dropdown>
          </div>
        </div>

      </div>
    );
  }
};
