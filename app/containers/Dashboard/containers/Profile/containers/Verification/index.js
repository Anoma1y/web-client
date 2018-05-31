import React from 'react';
import { Grid } from '@material-ui/core';
import VerificationForm from './components/VerificationForm';
import PhotoDocument from './components/PhotoDocument';
import PhotoIdentity from './components/PhotoIdentity';

export default () => (
  <Grid container className={'profile'}>
    <Grid container className={'profile-form_wrapper'}>

      <VerificationForm />

    </Grid>
    <Grid container className={'profile-form_wrapper'}>

      <PhotoIdentity />

    </Grid>
    <Grid container className={'profile-form_wrapper'}>

      <PhotoDocument />

    </Grid>
  </Grid>
)
