import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Person as PersonIcon } from '@material-ui/icons';
import { getUserName } from 'lib/utils';

@connect(state => ({ Dashboard_Sidebar: state.Dashboard_Sidebar }))
export default class SidebarUser extends React.Component {

  // todo поправить стили для очень длинного логина
  render() {
    const { profile } = this.props.Dashboard_Sidebar;
    return (
      <div className={'user-info sidebar-container'}>

        <div className={'sidebar-container_icon'}>
          <div className={'user-info_avatar'}>
            <PersonIcon />
          </div>
        </div>

        <div className={'user-info_name sidebar-container_content'}>
          <Link to={'/dashboard/profile'}>{getUserName(profile)}</Link>
        </div>

      </div>
    )
  }
}
