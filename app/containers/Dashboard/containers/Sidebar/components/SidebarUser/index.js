import React from 'react';
import Avatar from 'components/Avatar';
import { Row, Col } from 'react-flexbox-grid';
import './style.scss';

export default () => (

  <div className={'user-info'}>
    <div className={'user-info_avatar sidebar__left'}>
      <Avatar size={'md'} />
    </div>
    <div className={'user-info_name sidebar__right'}>
      <p>Alexander Wasowsky</p>
    </div>
  </div>

);
