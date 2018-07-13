import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, CircularProgress } from '@material-ui/core';
import { pullAwailableIssuers } from '../../containers/Wallet/store/actions';

@connect(null, ({ pullAwailableIssuers }))
export default class ProductList extends React.Component {

  state = {
    ready: false,
    walletIsAvailable: false
  }

  componentDidMount() {
    this.props.pullAwailableIssuers()
      .then((walletIsAvailable) => {
        this.setState({
          ready: true,
          walletIsAvailable
        })
      })
      .catch(() => this.setState({ ready: true, walletIsAvailable: false }));
  }

  renderWallet = () => (
    <Grid container className={'addProduct-item_wrapper'} justify={'center'}>

      <Grid item xs={9}>
        <Grid container className={'addProduct-item addProduct-item__color_gray'}>
          <Grid item xs={5} className={'addProductItem-preview'}>
            <div className={'addProductItem-preview_img'}>
              <img src={'https://png.icons8.com/cotton/500/000000/coin-wallet.png'} alt={'Card Preview'} />
            </div>
          </Grid>

          <Grid item xs={7} className={'addProductItem-content'}>

            <h3 className={'addProductItem-content_title'}>Кошелек Jago</h3>
            <p className={'addProductItem-content_paragraph'}>
              Это дополнение к кошельку.
              <span className={'addProductItem-content__break'}> Баланс карты и кошелька — одно и то же.</span>
            </p>
            <ul className={'addProductItem_list'}>
              <li className={'addProductItem_list-item'}>Платежи винтернете</li>
              <li className={'addProductItem_list-item'}>Платежи в обычных магазинах</li>
              <li className={'addProductItem_list-item'}>Наличные без комиссии, 10000 ₽/мес</li>
            </ul>
            <p className={'addProductItem-price'}>
              <span className={'addProductItem-price_text addProductItem-price_amount'}>200</span>
              <span className={'addProductItem-price_text addProductItem-price_currency'}>Р</span>
              <span className={'addProductItem-price_text'}>за три года</span>
            </p>
            <Link to={'/dashboard/add/wallet'} className={'addProductItem-link'}>Подробней</Link>

          </Grid>
        </Grid>
      </Grid>

    </Grid>
  )

  renderItem = () => (

    <Grid container className={'addProduct-item_wrapper'} justify={'center'}>

      <Grid item xs={9}>
        <Grid container className={'addProduct-item addProduct-item__color_blue'}>
          <Grid item xs={5} className={'addProductItem-preview'}>
            <div className={'addProductItem-preview_img'}>
              <img src={'http://jago.com/wp-content/themes/Jago/assets/images/payment-card.svg'} alt={'Card Preview'} />
            </div>
          </Grid>

          <Grid item xs={7} className={'addProductItem-content'}>

            <h3 className={'addProductItem-content_title'}>Пластиковая карта Jago</h3>
            <p className={'addProductItem-content_paragraph'}>
              Это дополнение к кошельку.
              <span className={'addProductItem-content__break'}> Баланс карты и кошелька — одно и то же.</span>
            </p>
            <ul className={'addProductItem_list'}>
              <li className={'addProductItem_list-item'}>Платежи винтернете</li>
              <li className={'addProductItem_list-item'}>Платежи в обычных магазинах</li>
              <li className={'addProductItem_list-item'}>Наличные без комиссии, 10000 ₽/мес</li>
            </ul>
            <p className={'addProductItem-price'}>
              <span className={'addProductItem-price_text addProductItem-price_amount'}>200</span>
              <span className={'addProductItem-price_text addProductItem-price_currency'}>Р</span>
              <span className={'addProductItem-price_text'}>за три года</span>
            </p>
            <Link to={'/dashboard/add/card'} className={'addProductItem-link'}>Подробней</Link>

          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )

  renderLoader = () => <CircularProgress className={'dashboard_loading'} size={24} />

  render() {
    return this.state.ready ?
      <Grid item xs={12} className={'addProduct-list'}>
        {this.state.walletIsAvailable && this.renderWallet()}
        {this.renderItem()}

      </Grid>
      : this.renderLoader()
  }
}
