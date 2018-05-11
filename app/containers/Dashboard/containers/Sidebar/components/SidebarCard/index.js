import * as React from 'react';
import Text from 'components/Text';
import Amount from 'components/Amount';
import Icon from 'components/Icon';
import './style.scss';

const renderMasterCard = () => (
  <div className={'wallet-icon wallet-card'}>
    <Icon icon={'mastercard'} size={35} />
  </div>
);

const renderVisa = () => (
  <div className={'wallet-icon wallet-card'}>
    <Icon icon={'visa'} size={35} />
  </div>
);

const SidebarCard = () => {
  // TODO переделать под карты, добавить Dropdown меню для карт и кошельков
  return (
    <div className={'sidebar-wallets'}>

      <div className={'sidebar-wallet sidebar-container'}>
        <div className={'sidebar-wallet_icon sidebar-container_icon'}>
          {renderMasterCard()}
        </div>
        <div className={'sidebar-wallet_content sidebar-container_content'}>
          <Text className={'wallet-amount'}>
            <Text.Content className={'wallet-amount_name'}>
              7356*******4799
            </Text.Content>
            <Text.Sub className={'wallet-amount_value'}>
              <Amount value={52354234.22} />
            </Text.Sub>
          </Text>
        </div>
        <div className={'sidebar-wallet_btn sidebar-container_btn'}>
          <span>...</span>
        </div>
      </div>

      <div className={'sidebar-wallet sidebar-container'}>
        <div className={'sidebar-wallet_icon sidebar-container_icon'}>
          {renderVisa()}
        </div>
        <div className={'sidebar-wallet_content sidebar-container_content'}>
          <Text className={'wallet-amount'}>
            <Text.Content className={'wallet-amount_name'}>
              1434*******2222
            </Text.Content>
            <Text.Sub className={'wallet-amount_value'}>
              <Amount value={93.52} />
            </Text.Sub>
          </Text>
        </div>
        <div className={'sidebar-wallet_btn sidebar-container_btn'}>
          <span>...</span>
        </div>
      </div>

    </div>
  );
};

export default SidebarCard;
