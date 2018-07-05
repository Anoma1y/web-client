import React from 'react';
import { Grid, Divider } from '@material-ui/core';
import ChangePasswordForm from './components/ChangePasswordForm';
import NotificationForm from './components/NotificationForm';
import Session from './components/Session';

export default () => (
  <Grid container className={'profile'}>

    <Grid container className={'profile-form_wrapper'}>

      <ChangePasswordForm />

    </Grid>

    <Grid container>
      <Grid item xs={10}>
        <Divider />
      </Grid>
    </Grid>

    <Grid container className={'profile-form_wrapper'}>

      <NotificationForm />

    </Grid>

    <Grid container>
      <Grid item xs={10}>
        <Divider />
      </Grid>
    </Grid>

    <Grid container className={'profile-form_wrapper'}>

      <Session />

    </Grid>

  </Grid>
);
