import React from 'react';
import { connect } from 'react-redux';
import {
  EuroSymbol as EuroSymbolIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import {
  changeEditName,
  applyEditName
} from '../../store/actions'
import Text from 'components/Text';
import Amount from 'components/Amount';

const renderEuro = () => (
  <div className={'sidebar-wallet-icon wallet-currency'}>
    <EuroSymbolIcon />
  </div>
);

@connect(state => ({ Dashboard_Sidebar: state.Dashboard_Sidebar }), ({
  changeEditName,
  applyEditName
}))
export default class SidebarWallet extends React.Component {

  state = {
    editName: {
      index: 0,
      isEdit: false
    }
  }

  /**
   * Метод для изменения ввода имени кошелька
   * @param event
   */
  handleEditChange = (event) => {
    const { value } = event.target;

    if (value.length > 22 || /[^a-zA-Z\s\d_]/.test(value)) return;

    this.props.changeEditName(value);
  };

  /**
   * Метод для изменения измени кошелька на новый
   * @param index - индекс массива которым является текущий кошелек
   */
  handleApplyEdit = (index) => {
    if (this.props.Dashboard_Sidebar.editNameIsLoading) return;

    this.setState({
      editName: {
        index,
        isEdit: false
      }
    });

    this.props.applyEditName(index);
  };

  /**
   * Метод для открытия панели редактирования имени кошелька
   * @param index - индекс массива которым является текущий кошелек
   */
  handleEditOpen = (index) => {
    this.setState({
      editName: {
        index,
        isEdit: true
      }
    });
  }

  renderEditName = (index) => (
    <TextField
      type={'text'}
      className={'sidebar-wallet_edit-input'}
      value={this.props.Dashboard_Sidebar.editName || this.props.Dashboard_Sidebar.coins[index].name}
      onChange={(event) => this.handleEditChange(event, index)}
    />
  );

  renderEditControl = (index, amount) => (
    <div className={'sidebar-wallet_edit'}>
      <button
        className={'sidebar-wallet_edit-btn sidebar-wallet_edit__rename'}
        onClick={
          (this.state.editName.index === index && this.state.editName.isEdit)
            ? () => this.handleApplyEdit(index)
            : () => this.handleEditOpen(index)
        }
      >
        {
          (this.state.editName.index === index && this.state.editName.isEdit)
            ? <SaveIcon className={this.props.Dashboard_Sidebar.editNameIsLoading ? 'sidebar-wallet_edit__disabled' : ''} />
            : <EditIcon className={this.props.Dashboard_Sidebar.editNameIsLoading ? 'sidebar-wallet_edit__disabled' : ''} />
        }
      </button>
      {
        amount === 0 &&
        <button className={'sidebar-wallet_edit-btn sidebar-wallet_edit__delete'}>
          <DeleteIcon />
        </button>
      }
    </div>
  )

  render() {
    const { active } = this.props.Dashboard_Sidebar;
    return (
      <div className={'sidebar-wallets_wrapper'}>
        <div className={'sidebar_title'}>
          Wallets
        </div>
        {
          this.props.Dashboard_Sidebar.coins.map((item, index) => {
            const isActive = active.id === item.serial && active.type === 'wallet';
            return (
              <div className={`sidebar-wallet sidebar-container ${isActive ? 'sidebar-wallet__active' : ''}`} key={item.serial}>
                <div className={'sidebar-container_icon'}>
                  {renderEuro()}
                </div>
                <div className={'sidebar-wallet-content sidebar-container_content'}>
                  <Text className={'sidebar-wallet-amount'}>
                    <Text.Content className={'sidebar-wallet-amount_name'}>
                      {
                          this.state.editName.isEdit
                            ? this.renderEditName(index)
                            :
                            <Link to={`/dashboard/wallet/${item.serial}`}>
                              {item.name}
                            </Link>
                        }
                    </Text.Content>
                    <Text.Sub className={'sidebar-wallet-amount_value'}>
                      <Amount
                        value={item.amount}
                        currency={'EUR'}
                      />
                    </Text.Sub>
                  </Text>
                </div>
                <div className={'sidebar-wallet_btn sidebar-container_btn'}>
                  {this.renderEditControl(index, item.amount)}
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
