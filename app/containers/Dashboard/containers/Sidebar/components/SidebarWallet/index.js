import * as React from 'react';
import Text from 'components/Text';
import Amount from 'components/Amount';
import './style.scss';

const SidebarWallet = () => {

  return (
    <div className={'sidebar-wallets'}>

      <div className={'sidebar-wallet aside-lcr'}>
        <div className={'sidebar-wallet_icon aside-lcr_left'}>
          <div className="test-class">
            EUR
          </div>
        </div>
        <div className={'sidebar-wallet_content aside-lcr_center'}>
          <Text className={'wallet-amount'}>
            <Text.Content className={'wallet-amount_name'}>
              My Euro wallet
            </Text.Content>
            <Text.Sub className={'wallet-amount_value'}>
              <Amount value={24542.22} showCurrency={false}/>
            </Text.Sub>
          </Text>
        </div>
        <div className={'sidebar-wallet_btn aside-lcr_right'}>
          <span>...</span>
        </div>
      </div>

      <div className={'sidebar-wallet aside-lcr'}>
        <div className={'sidebar-wallet_icon aside-lcr_left'}>
          <div className="test-class">
            USD
          </div>
        </div>
        <div className={'sidebar-wallet_content aside-lcr_center'}>
          <Text className={'wallet-amount'}>
            <Text.Content className={'wallet-amount_name'}>
              My USD wallet
            </Text.Content>
            <Text.Sub className={'wallet-amount_value'}>
              <Amount value={97877.52} showCurrency={false}/>
            </Text.Sub>
          </Text>
        </div>
        <div className={'sidebar-wallet_btn aside-lcr_right'}>
          <span>...</span>
        </div>
      </div>

    </div>
  )

}

export default SidebarWallet;
