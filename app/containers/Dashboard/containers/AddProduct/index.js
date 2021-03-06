import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import ProductList from './containers/ProductList';
import Card from './containers/Card';
import Wallet from './containers/Wallet';
import './style.scss';

export default ({ match }) => (
  <Grid container justify={'center'} className={'addProduct container'}>
    <Switch>
      <Route exact path={`${match.url}/product-list`} component={ProductList} />
      <Route exact path={`${match.url}/card`} component={Card} />
      <Route exact path={`${match.url}/wallet`} component={Wallet} />
    </Switch>
  </Grid>
);

