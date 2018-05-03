import React from 'react';
import './style.scss';

export default () => (
  <div className={'sidebar-notice'}>
    <div className={'sidebar-notice_icon sidebar__left'}>
      <img src="https://cdn.onlinewebfonts.com/svg/img_515232.png" alt="" />
    </div>

    <div className={'sidebar-notice_message sidebar__right'}>
      Unverified account
    </div>
  </div>
);
