import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default ({ type }) => (
  <Fragment>
    <Link
      to={
        type === 'signin'
          ? '/auth/signin/'
          : '/auth/signup/'
      }
      className={'auth-top_text'}>
      {
        type === 'signin'
          ? 'Already have an account?'
          : 'Don\'t have an account?'
      }
      </Link>
    <Link
      className={'auth-top_link'}
      to={
        type === 'signin'
          ? '/auth/signin/'
          : '/auth/signup/'
      }
    >
      {
        type === 'signin'
          ? 'Sign In'
          : 'Get Started'
      }
    </Link>
  </Fragment>
);
