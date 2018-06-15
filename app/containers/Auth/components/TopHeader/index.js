import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default ({ type }) => (
  <Fragment>
    <span className={'auth-top_text'}>
      {
        type === 'signin'
          ? 'Already have an account?'
          : 'Dont have an account?'
      }
      </span>
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
