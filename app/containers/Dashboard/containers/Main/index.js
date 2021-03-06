import React from 'react';
import Banners from './components/Banners';
import Transaction from 'containers/Dashboard/containers/Transaction';
import { Grid } from '@material-ui/core';
import './style.scss';

export default () => (
  <Grid container justify={'center'} className={'dashboard'}>

    <Grid item xs={12}>
      <div className={'dashboard-container container'}>
        <Banners />
      </div>
    </Grid>

    <Grid item xs={12}>
      <div className={'dashboard-container container'}>
        <Transaction />
      </div>
    </Grid>

  </Grid>
)
