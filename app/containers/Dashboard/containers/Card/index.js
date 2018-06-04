import React from 'react';
import CardInfo from './components/CardInfo';
import Transaction from 'containers/Dashboard/containers/Transaction';
import ControlPanel from 'containers/Dashboard/components/ControlPanel';
import { Grid } from '@material-ui/core';
import './style.scss';

const items = [
  { name: 'Transactions', link: '/dashboard/card/transactions', icon: 'category-fines' },
  { name: 'Top-up', link: '/dashboard/card/topup', icon: 'transfer-in' },
  { name: 'Balance & limits', link: '/dashboard/card/balance', icon: 'filter' },
  { name: 'Settings', link: '/dashboard/card/settings', icon: 'settings' },
];

export default () => (
  <Grid container justify={'center'} className={'card'}>
    <Grid item xs={12} className={'dashboard-container dashboard-container__fluid'}>

      <CardInfo />

    </Grid>
    <Grid item xs={12} className={'dashboard-container container'}>

      <ControlPanel items={items} />

    </Grid>
    <Grid item xs={12} className={'dashboard-container'}>

      <Transaction />

    </Grid>
  </Grid>
)
