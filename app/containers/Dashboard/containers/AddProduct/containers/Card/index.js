import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

export default class Card extends Component {
  render() {
    return (
      <Grid item xs={12} className={'addProduct-list'}>
        <Grid container className={'addProduct-item'}>

          <Grid item xs={5} className={'addProductItem-preview'}>
            <div className={'addProductItem-preview_img'}>
              <img src={'http://jago.com/wp-content/themes/Jago/assets/images/payment-card.svg'} alt={'Card Preview'} />
            </div>
          </Grid>

          <Grid item xs={7} className={'addProductItem-content'}>

            <h3 className={'addProductItem-content_title'}>Пластиковая карта Jago</h3>
            <p className={'addProductItem-content_paragraph'}>
              Это дополнение к кошельку.
              <span className={'addProductItem-content__break'}> Баланс карты и кошелька — одно и то же. </span>
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
            <Link to={'/dashboard/'} className={'addProductItem-link'}>Подробней</Link>

          </Grid>

        </Grid>
      </Grid>
    );
  }
}
