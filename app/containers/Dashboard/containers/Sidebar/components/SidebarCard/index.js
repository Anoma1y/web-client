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
      return 'Карта ожидается';
    default:
      return 'В ожидании чуда';
  }
}

@connect((state) => ({ Dashboard_Sidebar: state.Dashboard_Sidebar }))
export default class SidebarCard extends React.Component {

  renderCardProgress = () => (
    <div className={'sidebar-tpcards'}>
      {this.props.Dashboard_Sidebar.thirdPartyCards.map((card) => {
        return (
          <div className={'sidebar-wallet sidebar-container'} key={card.cardId}>
            <div className={'sidebar-tpcards_item sidebar-wallet-content sidebar-container_content'}>
              <div className={'sidebar_tpcards_status'}>
                {getStatusCard(card.status)}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );

  renderCards = () => (
    <div className={'sidebar-cards'}>
      {
        this.props.Dashboard_Sidebar.cards.map((card) => {
          return (
            <div key={card.id} className={'sidebar-wallet sidebar-container'}>

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
        {this.props.Dashboard_Sidebar.thirdPartyCards.length !== 0 && this.renderCardProgress()}
        {this.props.Dashboard_Sidebar.cards.length !== 0 && this.renderCards()}
      </div>
    );
  }
};
