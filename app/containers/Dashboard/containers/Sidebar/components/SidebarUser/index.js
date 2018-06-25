import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Person as PersonIcon } from '@material-ui/icons';
import { getUserName } from 'lib/utils';

@connect(state => ({ Dashboard_Main: state.Dashboard_Main }))
export default class SidebarUser extends React.Component {

  render() {
    const { profile } = this.props.Dashboard_Main;

    return (
      <div className={'user-info sidebar-container'}>

        <div className={'sidebar-container_icon'}>
          <div className={'user-info_avatar'}>
            <PersonIcon />
          </div>
        </div>

        <div className={'user-info_name sidebar-container_content'}>
          <Link to={'/dashboard/profile'}>
            {getUserName(profile)}
          </Link>
        </div>

      </div>
    );
  }
}
