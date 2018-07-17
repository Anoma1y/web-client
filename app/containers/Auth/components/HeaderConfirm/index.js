import React, { Fragment } from 'react';

export default ({ isSignup }) => (
  <Fragment>
    <h1>Confirm</h1>
    {isSignup && <p>Please confirm your email by entering the OTP (one time password) we've sent to the address provided</p>}
    <p>If you haven't received the OTP within 30 seconds please push the resend button below.</p>
  </Fragment>
);
