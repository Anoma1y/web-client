import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Storage from 'lib/storage';
import './style.scss';

export default () => {
  const session = Storage.get('session');

  if (!session) return null;

  return (
    <Grid container className={'container'} justify={'center'} alignItems={'center'}>
      <Grid item xs={6} className={'not-found'}>
        <p className={'not-found_title'}>404</p>
        <p className={'not-found_text'}>Page not found</p>
        <Link to={session.token !== null ? '/dashboard/' : '/auth/signin/'} className={'not-found_link'}> {session.token !== null ? 'Go to your account' : 'Go to login'} </Link>
      </Grid>
    </Grid>
  );
};
