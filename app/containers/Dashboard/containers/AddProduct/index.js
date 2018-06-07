import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

export default class AddProduct extends Component {
  render() {
    return (
      <Grid container justify={'center'} className={'productNew container'}>

        <Grid item xs={12} className={'productNew-list'}>

          <Grid container className={'productNew-item'}>

            <Grid item xs={5} className={'productNewItem-preview'}>
              <div className={'productNewItem-preview_img'}>
                <img src={'http://jago.com/wp-content/themes/Jago/assets/images/payment-card.svg'} alt={'Card Preview'} />
              </div>
            </Grid>

            <Grid item xs={7} className={'productNewItem-content'}>

              <h3 className={'productNewItem-content_title'}>Пластиковая карта Jago</h3>
              <p className={'productNewItem-content_paragraph'}>
                Это дополнение к кошельку.
                <span className={'productNewItem-content__break'}> Баланс карты и кошелька — одно и то же. </span>
              </p>
              <ul className={'productNewItem_list'}>
                <li className={'productNewItem_list-item'}>Платежи винтернете</li>
                <li className={'productNewItem_list-item'}>Платежи в обычных магазинах</li>
                <li className={'productNewItem_list-item'}>Наличные без комиссии, 10000 ₽/мес</li>
              </ul>
              <p className={'productNewItem-price'}>
                <span className={'productNewItem-price_text productNewItem-price_amount'}>200</span>
                <span className={'productNewItem-price_text productNewItem-price_currency'}>Р</span>
                <span className={'productNewItem-price_text'}>за три года</span>
              </p>
              <Link to={'/dashboard/'} className={'productNewItem-link'}>Подробней</Link>

            </Grid>

          </Grid>

        </Grid>
      </Grid>
    );
  }
}
