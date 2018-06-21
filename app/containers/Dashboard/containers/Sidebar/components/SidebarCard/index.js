import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Check as CheckIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Cached as CachedIcon
} from '@material-ui/icons';
import Text from 'components/Text';
import Amount from 'components/Amount';
import Icon from 'components/Icon';

const renderMasterCard = () => (
  <div className={'sidebar-wallet-icon sidebar-wallet-card'}>
    <Icon name={'mastercard'} size={35} />
  </div>
);

const getStatusCard = (status) => {
  switch (status) {
    case 'WAITING_FOR_CARDHOLDER_DETAILS':
      return 'Waiting the details';
    case 'CONFIRMED_BY_CARDHOLDER':
      return 'Card are confirmed';
    case 'INACTIVE':
      return 'Inactive card';
    default:
      return 'Inactive status';
  }
}

@connect((state) => ({ Dashboard_Sidebar: state.Dashboard_Sidebar }))
export default class SidebarCard extends Component {

  state = {
    controlCard: {
      type: '',
      index: 0,
      isChange: false
    }
  };

  handleOpenControl = (type, index) => {
    if (this.props.Dashboard_Sidebar.editIsLoading) return;

    this.setState({
      controlCard: { type, index, isChange: true }
    });
  };

  handleCloseControl = () => {
    this.setState({
      controlCard: { type: '', index: 0, isChange: false }
    });
  };

  handleApplyControl = () => {
    if (this.props.Dashboard_Sidebar.editIsLoading) return;

    const { type, index, isChange } = this.state.controlCard;

    if (!isChange) return;

    switch (type) {
      case 'edit':
        this.props.applyEditName(index);
        break;
      case 'update':
        this.props.applyRemove(index);
        break;
      default:
        this.handleCloseControl();
    }

    this.handleCloseControl();
  };

  handleUpdateCard = (index) => {
    console.log('Update card with index', index)
  }

  renderProgressCard = (status) => (
    <div className={'sidebar-wallet_card-status'}>
      {getStatusCard(status)}
    </div>
  )

  renderControlPanel = (index, isActive = false) => {
    const { editIsLoading } = this.props.Dashboard_Sidebar;
    const isLoading = editIsLoading ? 'sidebar-wallet_edit-btn__loading' : '';

    return (
      <div className={'sidebar-wallet_edit'}>
        {
          (this.state.controlCard.isChange && this.state.controlCard.index === index) ?
            <Fragment>
              <button className={`sidebar-wallet_edit-btn sidebar-wallet_edit__apply ${isLoading}`} onClick={() => this.handleApplyControl()}>
                <CheckIcon />
              </button>
              <button className={`sidebar-wallet_edit-btn sidebar-wallet_edit__close ${isLoading}`} onClick={() => this.handleCloseControl()}>
                <CloseIcon />
              </button>
            </Fragment>
            :
            <Fragment>
              {
                isActive ?
                  <button className={`sidebar-wallet_edit-btn sidebar-wallet_edit__rename ${isLoading}`} onClick={() => this.handleOpenControl('edit', index)}>
                    <EditIcon />
                  </button>
                  :
                  <button className={`sidebar-wallet_edit-btn sidebar-wallet_edit__update ${isLoading}`} onClick={() => this.handleUpdateCard(index)}>
                    <CachedIcon />
                  </button>
              }
            </Fragment>

        }
      </div>
    )
  }

  renderCards = () => (
    <div className={'sidebar-cards'}>
      {
        this.props.Dashboard_Sidebar.cards.map((card, index) => {
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
                {this.renderControlPanel(index, isActive)}
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
