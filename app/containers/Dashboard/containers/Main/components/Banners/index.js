import React from 'react';
import { Link } from 'react-router-dom';
import Image from 'components/Image';
import { Grid } from '@material-ui/core';
import './style.scss';

export default () => (
  <div className={'dashboard-banners'}>

    <Grid container justify={'center'}>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <div className={'dashboard-banner'}>
          <div className={'dashboard-banner_item dashboard-banner_load-account'}>
            <Image src={'/static/images/banner1-544.png'} alt={'Banner 1'} fluid />
            <div className={'banner-load'}>
              <div className={'banner-load_title'}>
                Load Account with Card
              </div>
              <div className={'banner-load_content'}>
                <div className={'load-content_text'}>
                  Thanks to Jago, the time-consuming processes
                </div>
                <Link to={'/dashboard/add/product-list'} className={'load-content_btn'}>Got it!</Link>
              </div>
            </div>
          </div>
        </div>
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={6}>
        <div className={'dashboard-banner'}>
          <div className={'dashboard-banner_item dashboard-banner_mobile'}>
            <Image src={'/static/images/banner2-544.png'} alt={'Banner 2'} fluid />
            <div className={'banner-mobile'}>
              <a href="#" className={'banner-mobile_item'}>
                <Image src={'/static/images/gp-min.png'} alt={'Google Play'} />
              </a>
              <a href="#" className={'banner-mobile_item'}>
                <Image src={'/static/images/as-min.png'} alt={'App Store'} />
              </a>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  </div>
)
