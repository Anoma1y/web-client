import React from 'react';
import { connect } from 'react-redux';
import {
  EuroSymbol as EuroSymbolIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Settings as SettingsIcon
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import {
  changeEditNameWallet,
  applyEditNameWallet,
  applyRemove
} from '../../store/actions'
import Text from 'components/Text';
import Amount from 'components/Amount';
import Icon from 'components/Icon';

// todo добавить функцию для выбора валют
const renderCurrency = (currency) => (
  <div className={'sidebar-wallet-icon wallet-currency'}>
    {
      currency === 'EUR' ? <EuroSymbolIcon /> : currency === 'USD' ? <Icon name={'usd'} /> : null
    }
  </div>
);

@connect(({ Dashboard_Sidebar, Dashboard_Main }) => ({ Dashboard_Sidebar, Dashboard_Main }), ({
  changeEditNameWallet,
  applyEditNameWallet,
  applyRemove
}))
export default class SidebarWallet extends React.Component {

  state = {
    controlWallet: {
      type: '',
      index: 0,
      isChange: false
    }
  };

  /**
   * Метод для изменения ввода имени кошелька
   * @param event
   */
  handleEditChange = (event) => {
    const { value } = event.target;

    if (value.length > 22 || /[^a-zA-Z\s\d_]/.test(value)) return;

    this.props.changeEditNameWallet(value);
  };

  handleOpenControl = (type, index) => {
    if (this.props.Dashboard_Sidebar.editIsLoading) return;

    this.setState({
      controlWallet: { type, index, isChange: true }
    })
  }

  handleCloseControl = () => {
    this.setState({
      controlWallet: { type: '', index: 0, isChange: false }
    })
  }

  handleApplyControl = () => {
    if (this.props.Dashboard_Sidebar.editIsLoading) return;

    const { type, index, isChange } = this.state.controlWallet;

    if (!isChange) return;

    switch (type) {
      case 'edit':
        this.props.applyEditNameWallet(index);
        break;
      case 'remove':
        this.props.applyRemove(index);
        break;
      default:
        this.handleCloseControl();
    }

    this.handleCloseControl();
  };

  renderEditName = () => (
    <TextField
      type={'text'}
      className={'sidebar-wallet_edit-input'}
      value={this.props.Dashboard_Sidebar.editNameWallet || this.props.Dashboard_Main.wallets[this.state.controlWallet.index].name}
      onChange={(event) => this.handleEditChange(event, this.state.controlWallet.index)}
    />
  );

  renderRemoveConfirm = () => <div className={'sidebar-wallet_remove-confirm'}>Delete the wallet?</div>

  renderControlPanelContent = () => {

    const renderTypeContent = () => {
      switch (this.state.controlWallet.type) {
        case 'edit':
          return this.renderEditName();
        case 'remove':
          return this.renderRemoveConfirm();
        default:
          return null;
      }
    };

    return this.state.controlWallet.isChange && renderTypeContent();
  }

  renderOpenControl = () => (
    <div className={'sidebar-wallet_control-change'}>
      <div className={'sidebar-container_icon'}>
        <SettingsIcon />
      </div>
      <div className={'sidebar-wallet-content sidebar-container_content'}>
        {this.renderControlPanelContent()}
      </div>
      <div className={'sidebar-wallet_btn sidebar-container_btn'}>
        {this.renderControlPanel(this.state.controlWallet.index)}
      </div>
    </div>
  )

  renderControlPanel = (index) => {
    const { editIsLoading } = this.props.Dashboard_Sidebar;
    const isLoading = editIsLoading ? 'sidebar-wallet_edit-btn__loading' : '';

    return (
      <div className={'sidebar-wallet_edit'}>
        {
          (this.state.controlWallet.isChange && this.state.controlWallet.index === index) ?
            <React.Fragment>
              <button className={`sidebar-wallet_edit-btn sidebar-wallet_edit__apply ${isLoading}`} onClick={() => this.handleApplyControl()}>
                <CheckIcon />
              </button>
              <button className={`sidebar-wallet_edit-btn sidebar-wallet_edit__close ${isLoading}`} onClick={() => this.handleCloseControl()}>
                <CloseIcon />
              </button>
            </React.Fragment>
            :
            <React.Fragment>
              <button className={`sidebar-wallet_edit-btn sidebar-wallet_edit__rename ${isLoading}`} onClick={() => this.handleOpenControl('edit', index)}>
                <EditIcon />
              </button>
              <button className={`sidebar-wallet_edit-btn sidebar-wallet_edit__delete ${isLoading}`} onClick={() => this.handleOpenControl('remove', index)}>
                <DeleteIcon />
              </button>
            </React.Fragment>

        }
      </div>
    )
  }

  renderContent = (item, index) => (
    <React.Fragment>
      <div className={'sidebar-container_icon'}>
        {
          renderCurrency(item.issuer.currency)
        }
      </div>
      <div className={'sidebar-wallet-content sidebar-container_content'}>
        <Text className={'sidebar-wallet-amount'}>
          <Text.Content className={'sidebar-wallet-amount_name'}>
            {

              <Link to={`/dashboard/wallet/${item.serial}`}>
                {item.name}
              </Link>
            }
          </Text.Content>
          <Text.Sub className={'sidebar-wallet-amount_value'}>
            <Amount value={item.amount} currency={item.issuer.currency} />
          </Text.Sub>
        </Text>
      </div>
      <div className={'sidebar-wallet_btn sidebar-container_btn'}>
        {this.renderControlPanel(index)}
      </div>
    </React.Fragment>
  )

  render() {
    const { active } = this.props.Dashboard_Sidebar;

    return (
      <div className={'sidebar-wallets_wrapper'}>
        <div className={'sidebar_title'}>
          Wallets
        </div>
        {
          this.props.Dashboard_Main.wallets.map((item, index) => {

            const isActive = active.id === item.serial && active.type === 'wallet';
            return (
              <div className={`sidebar-wallet sidebar-container ${isActive ? 'sidebar-wallet__active' : ''}`} key={item.serial}>

                {
                  (this.state.controlWallet.isChange && this.state.controlWallet.index === index)
                    ? this.renderOpenControl()
                    : this.renderContent(item, index)
                }

              </div>
            );

          })
        }
      </div>
    );
  }
}
