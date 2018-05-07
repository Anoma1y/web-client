import * as React from 'react';
import Text from 'components/Text';
import Amount from 'components/Amount';
import Dropdown from 'components/Dropdown';
import './style.scss';

const item = [
  { name: 'Pay', link: '/wallet/pay' },
  { name: 'Rename', link: '/wallet/rename' },
  { name: 'Delete', link: '/wallet/delete' }
];

const renderEuro = () => (
  <div className={'wallet-icon wallet-currency'}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M15 18.5c-2.51 0-4.68-1.42-5.76-3.5H15v-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15V9H9.24C10.32 6.92 12.5 5.5 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3C19.41 3.87 17.3 3 15 3c-3.92 0-7.24 2.51-8.48 6H3v2h3.06c-.04.33-.06.66-.06 1 0 .34.02.67.06 1H3v2h3.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57z" />
    </svg>
  </div>
)

const SidebarWallet = () => {

  return (
    <div className={'sidebar-wallets'}>

      <div className={'sidebar-wallet sidebar-container'}>
        <div className={'sidebar-wallet_icon sidebar-container_icon'}>
          {renderEuro()}
        </div>
        <div className={'sidebar-wallet_content sidebar-container_content'}>
          <Text className={'wallet-amount'}>
            <Text.Content className={'wallet-amount_name'}>
              My Euro wallet
            </Text.Content>
            <Text.Sub className={'wallet-amount_value'}>
              <Amount value={24542.22} showCurrency={false} />
            </Text.Sub>
          </Text>
        </div>
        <div className={'sidebar-wallet_btn sidebar-container_btn'}>
          <Dropdown item={item}>...</Dropdown>
        </div>
      </div>

      <div className={'sidebar-wallet sidebar-container'}>
        <div className={'sidebar-wallet_icon sidebar-container_icon'}>
          {renderEuro()}
        </div>
        <div className={'sidebar-wallet_content sidebar-container_content'}>
          <Text className={'wallet-amount'}>
            <Text.Content className={'wallet-amount_name'}>
              My USD wallet
            </Text.Content>
            <Text.Sub className={'wallet-amount_value'}>
              <Amount value={97877.52} showCurrency={false} />
            </Text.Sub>
          </Text>
        </div>
        <div className={'sidebar-wallet_btn sidebar-container_btn'}>
          <Dropdown item={item}>...</Dropdown>
        </div>
      </div>

    </div>
  )

}

export default SidebarWallet;
