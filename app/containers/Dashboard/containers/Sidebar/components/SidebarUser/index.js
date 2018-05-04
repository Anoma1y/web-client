import React from 'react';
import Avatar from 'components/Avatar';
import './style.scss';

export default () => (
  <div className={'user-info aside-lr'}>

    <div className={'user-info_avatar aside-lr_left'}>
      <Avatar size={'md'} />
    </div>

    <div className={'user-info_name aside-lr_right'}>
      Alexander Wasowsky
    </div>

  </div>
);
