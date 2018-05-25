import React, { Fragment } from 'react';

export default ({ isPhone }) => (
  <Fragment>
    <h1>Confirm</h1>
    <p>Please enter the One Time Password (OTP) sent to you {isPhone ? 'mobile number' : 'EMail'}. If you do not receive your OTP within 30 second, please click on the <span className={'auth-form_header__color_blue'}>Resend OTP</span> button and thi will be resent</p>
  </Fragment>
)
