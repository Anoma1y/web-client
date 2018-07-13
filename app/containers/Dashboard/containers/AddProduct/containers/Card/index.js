import React, { Component } from 'react';
import {
  Grid,
  Button,
} from '@material-ui/core';

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

            <div className={'addProductItem-container'}>
              <h3 className={'addProductItem-container_title'}>Пластиковая карта Jago</h3>
              <div className={'addProductItem-container_item addProductItem-container_description'}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam et facilis modi optio! Alias amet architecto, asperiores at cum, dolor dolore eum fugiat harum hic inventore laudantium magnam minus modi mollitia nisi non numquam obcaecati odit officia omnis perferendis possimus provident quae, quaerat quod sapiente sit sunt suscipit totam veritatis.
              </div>
              <div className={'addProductItem-container_item addProductItem-container_btn'}>
                <Button
                  variant={'raised'}
                  color={'primary'}
                >
                  To order
                </Button>
              </div>

            </div>
          </Grid>

        </Grid>
      </Grid>
    );
  }
}
