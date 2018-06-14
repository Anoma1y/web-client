import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Card from './containers/Card';
import Wallet from './containers/Wallet';
import { Grid } from '@material-ui/core';

export default class AddProduct extends Component {
  render() {
    return (
      <Grid container justify={'center'} className={'productNew container'}>
        <Switch>
          <Route exact path={`${this.props.match.url}/card`} component={Card} />
          <Route exact path={`${this.props.match.url}/wallet`} component={Wallet} />
        </Switch>
      </Grid>
    )
  }
}
