import React from 'react';
import {
  Grid,
  Divider
} from '@material-ui/core';
import FormPersonInfo from './components/FormPersonInfo';
import FormUserAddress from './components/FormUserAddress';
import PhotoDocument from './components/PhotoDocument';
import PhotoIdentity from './components/PhotoIdentity';

export default () => (
  <Grid container className={'profile'}>
    <Grid container className={'profile-form_wrapper'}>
      <div className={'dashboard-container'}>
        <FormPersonInfo />
      </div>
      <div className={'dashboard-container'}>
        <FormUserAddress />
      </div>
    </Grid>

    <Grid container>
      <Grid item xs={10}>
        <Divider />
      </Grid>
    </Grid>

    <Grid container className={'profile-form_wrapper'}>

      <PhotoIdentity />
    </Grid>

    <Grid container>
      <Grid item xs={10}>
        <Divider />
      </Grid>
    </Grid>

    <Grid container className={'profile-form_wrapper'}>

      <PhotoDocument />

    </Grid>
  </Grid>
)
