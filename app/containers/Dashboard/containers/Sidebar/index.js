import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  Person as PersonIcon
} from '@material-ui/icons';
import SidebarUser from './components/SidebarUser';
import SidebarNotification from './components/SidebarNotification';
import SidebarWallet from './components/SidebarWallet';
import SidebarCard from './components/SidebarCard';
import ProductAdd from './components/ProductAdd';
import './style.scss';

@connect(state => ({ Dashboard_Sidebar: state.Dashboard_Sidebar }))
class Sidebar extends Component {

  state = {
    sidebarIsOpen: false
  };

  /**
   * После монтирования и демонтирования компонента, добавляются / убираются обработчики событий для
   * - ресайза области с целью изменения состояния sidebarIsOpen на false - закрытие сайдбара
   * - клик по любой другой области не совпадающей с сайдбаром
   */
  componentDidMount() {
    this.updateDimensions();
    document.addEventListener('mousedown', this.handleClickOutside);
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    window.removeEventListener('resize', this.updateDimensions);
  }

  /**
   * Функция обработчки клика по области (не сайдбара)
   * Переводит стейт в состояние false
   * @param event
   */
  handleClickOutside = (event) => {
    if (this.sidebarRef && !this.sidebarRef.contains(event.target)) {
      this.setState({
        sidebarIsOpen: false
      });
    }
  };

  /**
   * Функция обработчки ресайза, если рабочая область больше 1200 пикселей (3ий основной брейкпоинт)
   * то переводит стейт в состояние false
   */
  updateDimensions = () => {
    if (window.innerWidth >= 1200) {
      this.setState({
        sidebarIsOpen: false
      });
    }
  };

  /**
   * Функция обработчки клика по батону вызова сайдбара
    */
  handleSidebarOpen = () => {
    this.setState({
      sidebarIsOpen: !this.state.sidebarIsOpen
    });
  };

  /**
   * Функция обработчки клика по батону закрытия сайдбара
   */
  handleSidebarClose = () => {
    this.setState({
      sidebarIsOpen: false
    });
  };

  /**
   * Привязка ref для дива с контейнером сайдбара
   * @param node
   */
  handleSidebarRef = (node) => {
    this.sidebarRef = node;
  };

  render() {

    const { sidebarIsOpen } = this.state;
    return (
      <React.Fragment>
        <div className={`sidebar sidebar-content ${sidebarIsOpen ? 'sidebar__active' : ''}`} ref={this.handleSidebarRef}>

          <div className={'sidebar-wrapper'}>

            <div className={'sidebar-inner'}>

              <div className={'sidebar_item sidebar-user'}>
                <SidebarUser />
              </div>

              <div className={'sidebar_item sidebar-notification'}>
                {
                  this.props.Dashboard_Sidebar.notification && <SidebarNotification />
                }
              </div>

              <div className={'sidebar_item sidebar-wallets'}>
                {
                  this.props.Dashboard_Sidebar.coins.length !== 0 && <SidebarWallet />
                }
              </div>

              <div className={'sidebar_item sidebar-wallets'}>
                {
                  (this.props.Dashboard_Sidebar.cards.length !== 0 || this.props.Dashboard_Sidebar.thirdPartyCards.length !== 0) && <SidebarCard />
                }

              </div>

              <div className={'sidebar_item sidebar-product-add'}>
                <ProductAdd />
              </div>

            </div>

            <div className={'sidebar-inner'}>
              <button className={'sidebar-close'} onClick={this.handleSidebarClose}>
                <div className={'sidebar-close_icon'}>
                  <KeyboardArrowLeftIcon />
                </div>
                <div className={'sidebar-close_text'}>
                  Close menu
                </div>
              </button>
            </div>

          </div>
        </div>
        <div className={'sidebar-mobile'}>
          <button className={'sidebar-mobile_button'} onClick={this.handleSidebarOpen}>

            <PersonIcon color={'primary'} />

          </button>
        </div>
        <div className={`blackout ${sidebarIsOpen ? 'blackout__active' : ''}`}> </div>
      </React.Fragment>
    );
  }
}

export default Sidebar;
