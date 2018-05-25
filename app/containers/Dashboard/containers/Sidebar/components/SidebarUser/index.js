import React from 'react';
import { connect } from 'react-redux';
import Icon from 'components/Icon';
import { Link } from 'react-router-dom';
import './style.scss';

@connect(state => ({ Dashboard_Sidebar: state.Dashboard_Sidebar }))
export default class SidebarUser extends React.Component {

  getName = () => {
    const { profile } = this.props.Dashboard_Sidebar;

    if (profile.person) {
      const { nameIntl, namePlain } = profile.person;

      if (nameIntl.first && nameIntl.last) {
        return `${nameIntl.first} ${nameIntl.last}`;
      } else if (namePlain.first && namePlain.last) {
        return `${namePlain.first} ${namePlain.last}`;
      }
    }

    if (profile.contact) {
      const { contact } = profile;
      return contact.email || contact.phoneNumber;
    }

  };
  // todo поправить стили для очень длинного логина
  render() {
    return (
      <div className={'user-info sidebar-container'}>

        <div className={'sidebar-container_icon'}>
          <div className={'user-info_avatar'}>
            <Icon name={'user'} size={18} />
          </div>
        </div>

        <div className={'user-info_name sidebar-container_content'}>
          <Link to={'/dashboard/profile'}>{this.getName()}</Link>
        </div>

      </div>
    )
  }
}
