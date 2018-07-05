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
import { updateCard } from '../../store/actions';
import { getCardStatus } from 'lib/card';
import _ from 'lodash';

const renderMasterCard = () => (
  <div className={'sidebar-wallet-icon sidebar-wallet-card'}>
    <Icon name={'mastercard'} size={35} />
  </div>
);

@connect((state) => ({ Dashboard_Sidebar: state.Dashboard_Sidebar, Dashboard: state.Dashboard }), ({
  updateCard
}))
export default class SidebarCard extends Component {

  state = {
    controlCard: {
      id: 0,
      type: '',
      index: 0,
      isChange: false
    }
  };

  handleOpenControl = (type, id, index) => {
    if (this.props.Dashboard_Sidebar.editIsLoading) return;

    this.setState({ controlCard: { type, id, index, isChange: true } });
  };

  handleCloseControl = () => {
    this.setState({ controlCard: { type: '', id: 0, index: 0, isChange: false } });
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

  handleUpdateCard = _.debounce((id, index) => {
    this.props.updateCard(id, index);
  }, 1000);

  renderProgressCard = (status) => (
    <div className={'sidebar-wallet_card-status'}>
      { this.props.Dashboard_Sidebar.cardsIsUpdate ? <span className={'sidebar-wallet_card-status__update'}>Update status</span> : getCardStatus(status) }
    </div>
  );

  renderAmount = (amount, currency = 'EUR') => <Amount value={amount} currency={currency} />;

  renderControlPanel = (id, index, isActive = false) => {
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
                  <button className={`sidebar-wallet_edit-btn sidebar-wallet_edit__rename ${isLoading}`} onClick={() => this.handleOpenControl('edit', id, index)}>
                    <EditIcon />
                  </button>
                  :
                  <button className={`sidebar-wallet_edit-btn sidebar-wallet_edit__update ${isLoading}`} onClick={() => this.handleUpdateCard(id, index)}>
                    <CachedIcon />
                  </button>
              }
            </Fragment>

        }
      </div>
    );
  }

  renderCards = () => {
    const { active: sidebarActiveTab } = this.props.Dashboard_Sidebar;
    return (
      <div className={'sidebar-cards'}>
        {
          this.props.Dashboard.cards.map((card, index) => {
            const { card: cardInfo } = card;
            const isActive = cardInfo.status === 'ACTIVE';
            const isSidebarActiveTab = sidebarActiveTab.id === cardInfo.id && sidebarActiveTab.type === 'card';

            return (
              <div key={cardInfo.id} className={`sidebar-wallet sidebar-container ${isSidebarActiveTab ? 'sidebar-wallet__active' : ''}`}>
                <div className={'sidebar-container_icon'}>
                  {renderMasterCard()}
                </div>
                <div className={'sidebar-wallet-content sidebar-container_content'}>
                  <Link to={`/dashboard/card/${cardInfo.id}`}>
                    <Text className={'sidebar-wallet-amount'}>
                      <Text.Content className={'sidebar-wallet-amount_name'}>
                        Master Card **** {cardInfo.number.slice(-4)}
                      </Text.Content>
                      <Text.Sub className={'sidebar-wallet-amount_value'}>
                        {
                          isActive
                            ? this.renderAmount(0, cardInfo.currency)
                            : this.renderProgressCard(cardInfo.status)
                        }
                      </Text.Sub>
                    </Text>
                  </Link>
                </div>
                <div className={'sidebar-wallet_btn sidebar-container_btn'}>
                  {this.renderControlPanel(cardInfo.id, index, isActive)}
                </div>
              </div>
            );
          })
        }
      </div>
    )
  }

  render() {
    return (
      <div className={'sidebar-wallets_wrapper'}>

        <div className={'sidebar_title'}>
          Cards
        </div>

        {
          this.props.Dashboard.cards.length !== 0 && this.renderCards()
        }

      </div>
    );
  }
}
