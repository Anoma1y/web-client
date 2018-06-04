import React from 'react';
import Text from 'components/Text';
import Amount from 'components/Amount';
import Icon from 'components/Icon';
import Dropdown from 'components/Dropdown';

const menuItems = [
  { name: 'Pay', link: '/wallet/pay' },
  { name: 'Rename', link: '/wallet/rename' },
];

const renderMasterCard = () => (
  <div className={'wallet-icon wallet-card'}>
    <Icon name={'mastercard'} size={35} />
  </div>
);

const renderVisa = () => (
  <div className={'wallet-icon wallet-card'}>
    <Icon name={'visa'} size={35} />
  </div>
);

export default class SidebarCard extends React.Component {
  render() {
    return (
      <div className={'sidebar-wallets'}>
        <div className={'wallet sidebar-container'}>
          <div className={'sidebar-container_icon'}>
            {renderMasterCard()}
          </div>
          <div className={'wallet-content sidebar-container_content'}>
            <Text className={'wallet-amount'}>
              <Text.Content className={'wallet-amount_name'}>
                Master Card **** 6307
              </Text.Content>
              <Text.Sub className={'wallet-amount_value'}>
                <Amount value={23450.52} />
              </Text.Sub>
            </Text>
          </div>
          <div className={'wallet_btn sidebar-container_btn'}>
            <Dropdown item={menuItems}>...</Dropdown>
          </div>
        </div>
      </div>
    );
  }
};
