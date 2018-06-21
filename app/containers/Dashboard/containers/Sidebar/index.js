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
import {
  pullCard,
  pullCoins,
  pullProfile,
  pullThirdPartyCards,
} from './store/actions';
import Storage from 'lib/storage';
import './style.scss';

@connect(state => ({ Dashboard_Sidebar: state.Dashboard_Sidebar }), ({
  pullCard,
  pullCoins,
  pullProfile,
  pullThirdPartyCards,
}))
export default class Sidebar extends Component {

  state = {
    sidebarIsOpen: false
  };

  /**
   * После монтирования и демонтирования компонента, добавляются / убираются обработчики событий для
   * - ресайза области с целью изменения состояния sidebarIsOpen на false - закрытие сайдбара
   * - клик по любой другой области не совпадающей с сайдбаром
   * Первичная инициализация подразумевает для каждой роли получения нобходиммых данных
   * Для карты получается инфа о всех картах привязанных  к аккаунту и затем выполнения Promise.all для каждого id карты
   */
  componentDidMount() {
    const ROLES = {
      individual: [this.props.pullCoins, this.props.pullProfile, this.props.pullThirdPartyCards],
      merchant: [this.props.pullCoins, this.props.pullProfile],
      administrator: [this.props.pullProfile],
      byDefault: [this.props.pullProfile]
    };

    const { role } = Storage.get('members')[0];
    const currentRoleInitialActions = ROLES[role] || ROLES.byDefault;

    Promise.all(currentRoleInitialActions.map((action) => action()))
      .then(() => {

        if (role === 'individual') {
          const { thirdPartyCards } = this.props.Dashboard_Sidebar;
          const pullCardList = thirdPartyCards.map((card) => () => this.props.pullCard(card.cardId));

          Promise.all(pullCardList.map((card) => card()))
            .then(() => this.setState({ ready: true }))
            .catch(() => this.setState({ ready: true }));

        } else {
          this.setState({ ready: true });
        }

      })
      .catch(() => this.setState({ ready: true }));

    document.addEventListener('mousedown', this.handleClickOutside);
    window.addEventListener('resize', this.updateDimensions);
    this.updateDimensions();
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    window.removeEventListener('resize', this.updateDimensions);
  }

  /**
   * Метод обработчки клика по области (не сайдбара)
   * Переводит стейт в состояние false
   * @param event
   */
  handleClickOutside = (event) => {
    if (this.sidebarRef && !this.sidebarRef.contains(event.target)) {
      this.setState({ sidebarIsOpen: false });
    }
  };

  /**
   * Метод обработчки ресайза, если рабочая область больше 1200 пикселей (3ий основной брейкпоинт)
   * то переводит стейт в состояние false
   */
  updateDimensions = () => {
    if (window.innerWidth >= 1200) {
      this.setState({ sidebarIsOpen: false });
    }
  };

  /**
   * Метод обработчки клика по батону вызова сайдбара
    */
  handleSidebarOpen = () => {
    this.setState({ sidebarIsOpen: !this.state.sidebarIsOpen });
  };

  /**
   * Метод обработчки клика по батону закрытия сайдбара
   */
  handleSidebarClose = () => {
    this.setState({ sidebarIsOpen: false });
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
    const {
      notification,
      coins,
      cards
    } = this.props.Dashboard_Sidebar;

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
                  notification && <SidebarNotification />
                }
              </div>

              <div className={'sidebar_item sidebar-wallets'}>
                {
                  coins.length !== 0 && <SidebarWallet />
                }
              </div>

              <div className={'sidebar_item sidebar-wallets'}>
                {
                  cards.length !== 0 && <SidebarCard />
                }
              </div>

              <div className={'sidebar_item sidebar-product-add'}>

                <ProductAdd
                  name={'Add product'}
                  link={'product-list'}
                />

              </div>

            </div>
            <div className={'sidebar-inner'}>
              <button className={'sidebar-close'} onClick={this.handleSidebarClose}>
                <div className={'sidebar-close_icon'}>

                  <KeyboardArrowLeftIcon />

                </div>
                <div className={'sidebar-close_text'}>Close menu</div>
              </button>
            </div>

          </div>
        </div>
        <div className={'sidebar-mobile'}>
          <button className={'sidebar-mobile_button'} onClick={this.handleSidebarOpen}>

            <PersonIcon color={'primary'} />

          </button>
        </div>
        <div className={`blackout ${sidebarIsOpen ? 'blackout__active' : ''}`} />
      </React.Fragment>
    );
  }
}
