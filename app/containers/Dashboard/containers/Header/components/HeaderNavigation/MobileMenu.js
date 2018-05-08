import * as React from 'react';
import {
  upperFirstCase
} from 'lib/pathUtils';
import { Link } from 'react-router-dom';

type Props = {
  item: Array<{
    name: string,
    link: string
  }>
};

type State = {
  isOpen: boolean
}

export default class MobileMenu extends React.Component<Props, State> {

  state = {
    isOpen: false
  };
  /**
   * После монтирования и демонтирования компонента, добавляются / убираются обработчики событий для
   * - ресайза области с целью изменения состояния isOpen на false - закрытие сайдбара
   * - клик по любой другой области не совпадающей с сайдбаром
   */
  componentDidMount() {
    this.updateDimensions();
    (document.addEventListener: Function)('mousedown', this.handleClickOutside);
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    (document.removeEventListener: Function)('mousedown', this.handleClickOutside);
    window.removeEventListener('resize', this.updateDimensions);
  }

  /**
   * Функция обработчки клика по области (не сайдбара)
   * Переводит стейт в состояние false
   * @param event
   */
  handleClickOutside = (event: SyntheticEvent<HTMLButtonElement>) => {
    if (this.mobileRef && !this.mobileRef.contains(event.target)) {
      this.setState({
        isOpen: false
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
        isOpen: false
      });
    }
  };

  /**
   * Привязка ref для дива с контейнером сайдбара
   * @param node
   */
  handleMobileNavRef = (node: ?HTMLDivElement) => {
    this.mobileRef = node;
  };

  mobileRef: ?any;

  /**
   * Функция обработчки открытия меню
   */
  handleOpen = () => {
    this.setState({
      isOpen: true
    });
  };

  /**
   * Функция обработчки закрытия меню
   */
  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };

  /**
   * Рендер ссылок
   * @returns {React.Node}
   */
  renderItem = () => {
    const { item } = this.props;
    return item.map(({ name, link }) => <Link key={name} className={'mnav-menu_link'} to={link}>{upperFirstCase(name)}</Link>);
  };

  render() {

    const { isOpen } = this.state;

    return (
      <div className={'mnav'}>

        <button className={'mnav_trigger'} onClick={this.handleOpen}>

          <svg height="32px" version="1.1" viewBox="0 0 32 32" width="32px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" ><path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
          </svg>

        </button>

        <div className={`mnav-content ${isOpen ? 'mnav-content__active' : ''}`} ref={this.handleMobileNavRef}>
          <ul className={'mnav-menu'}>
            <li className={'mnav-menu_item'}>
              { this.renderItem() }
            </li>

          </ul>

          <div className={'mnav-menu_logout'}>
            Logout
          </div>
          <div className={'mnav-content_close'}>
            <button className={'mnav-content_close-btn'} onClick={this.handleClose}>
              <svg viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <line x1="1" y1="11" x2="11" y2="1" stroke="black" strokeWidth="2" />
                <line x1="1" y1="1" x2="11" y2="11" stroke="black" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
        <div className={`blackout ${isOpen ? 'blackout__active' : ''}`}> </div>
      </div>
    );
  }
}

