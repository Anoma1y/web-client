import React from 'react';
import {
  Grid,
  Divider
} from '@material-ui/core';
import VerificationForm from './components/VerificationForm';
import PhotoDocument from './components/PhotoDocument';
import PhotoIdentity from './components/PhotoIdentity';

export default () => (
  <Grid container className={'profile'}>
    <Grid container className={'profile-form_wrapper'}>

      <VerificationForm />

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
