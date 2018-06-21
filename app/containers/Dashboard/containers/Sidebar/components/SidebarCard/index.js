import React from 'react';
import { connect } from 'react-redux';
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

const getStatusCard = (status) => {
  switch (status) {
    case 'WAITING_FOR_CARDHOLDER_DETAILS':
      return 'Card is waiting for cardholder to confirm the details';
    case 'CONFIRMED_BY_CARDHOLDER':
      return 'Card details are confirmed by cardholder';
    case 'INACTIVE':
      return 'Inactive card';
    default:
      return 'Неизсвестный статус';
  }
}

@connect((state) => ({ Dashboard_Sidebar: state.Dashboard_Sidebar }))
export default class SidebarCard extends React.Component {

  renderProgressCard = (status) => (
    <div className={'sidebar-wallet_card-status'}>
      {getStatusCard(status)}
    </div>
  )

  renderCards = () => (
    <div className={'sidebar-cards'}>
      {
        this.props.Dashboard_Sidebar.cards.map((card) => {
          const { card: cardInfo } = card;
          const isActive = cardInfo.status === 'ACTIVE';

          return (
            <div key={cardInfo.id} className={'sidebar-wallet sidebar-container'}>
              <div className={'sidebar-container_icon'}>
                {renderMasterCard()}
              </div>
              <div className={'sidebar-wallet-content sidebar-container_content'}>
                <Link to={isActive ? '/dashboard/card' : '/dashboard/'}>
                  <Text className={'sidebar-wallet-amount'}>
                    <Text.Content className={'sidebar-wallet-amount_name'}>
                      Master Card **** {cardInfo.number.slice(-4)}
                    </Text.Content>
                    <Text.Sub className={'sidebar-wallet-amount_value'}>
                      {
                        isActive
                          ? <Amount value={0} currency={cardInfo.currency} />
                          : this.renderProgressCard(cardInfo.status)
                      }
                    </Text.Sub>
                  </Text>
                </Link>
              </div>
              <div className={'sidebar-wallet_btn sidebar-container_btn'}>

              </div>
            </div>
          )
        })
      }
    </div>
  )

  render() {
    return (
      <div className={'sidebar-wallets_wrapper'}>

        <div className={'sidebar_title'}>
          Cards
        </div>
        {this.props.Dashboard_Sidebar.cards.length !== 0 && this.renderCards()}
      </div>
    );
  }
};
