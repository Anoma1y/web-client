import * as React from 'react';
import Text from 'components/Text';
import Amount from 'components/Amount';
import './style.scss';

const SidebarCard = () => {
  // TODO переделать под карты, добавить Dropdown меню для карт и кошельков
  return (
    <div className={'sidebar-wallets'}>

      <div className={'sidebar-wallet aside-lcr'}>
        <div className={'sidebar-wallet_icon aside-lcr_left'}>
          Visa
        </div>
        <div className={'sidebar-wallet_content aside-lcr_center'}>
          <Text className={'wallet-amount'}>
            <Text.Content className={'wallet-amount_name'}>
              7356*******4799
            </Text.Content>
            <Text.Sub className={'wallet-amount_value'}>
              <Amount value={52354234.22} showCurrency={false}/>
            </Text.Sub>
          </Text>
        </div>
        <div className={'sidebar-wallet_btn aside-lcr_right'}>
          <span>...</span>
        </div>
      </div>

      <div className={'sidebar-wallet aside-lcr'}>
        <div className={'sidebar-wallet_icon aside-lcr_left'}>
          Visa
        </div>
        <div className={'sidebar-wallet_content aside-lcr_center'}>
          <Text className={'wallet-amount'}>
            <Text.Content className={'wallet-amount_name'}>
              1434*******2222
            </Text.Content>
            <Text.Sub className={'wallet-amount_value'}>
              <Amount value={93.52} showCurrency={false}/>
            </Text.Sub>
          </Text>
        </div>
        <div className={'sidebar-wallet_btn aside-lcr_right'}>
          <span>...</span>
        </div>
      </div>

    </div>
  );
};

export default SidebarCard;
