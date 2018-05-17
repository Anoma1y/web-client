import React from 'react';
import Icon from 'components/Icon';
import { Link } from 'react-router-dom';
import './style.scss';

// TODO обрезать svg иконку снизу
export default () => (
  <div className={'user-info sidebar-container'}>

    <div className={'sidebar-container_icon'}>
      <div className={'user-info_avatar'}>
        <Icon icon={'user'} size={18} />
      </div>
    </div>

    <div className={'user-info_name sidebar-container_content'}>
      <Link to={'/dashboard/profile'}>Alexander Wasowsky </Link>
    </div>

  </div>
);
