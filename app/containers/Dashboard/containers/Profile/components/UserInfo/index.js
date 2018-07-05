import React, { Component } from 'react';
import { connect } from 'react-redux';
import Text from 'components/Text';
import {
  getUserName,
  getUserRole
} from 'lib/utils';
import Storage from 'lib/storage';

@connect(({ Dashboard_Profile }) => ({ Dashboard_Profile }))
export default class UserInfo extends Component {
  render() {
    const { profile } = this.props.Dashboard_Profile;
    const { role } = Storage.get('members')[0] || 'individual';

    return (
      <div className={'dashboard_info profile-user-name'}>
        <div className={'profile-user-name_content container'}>
          <Text className={'profile-user-name_text'}>
            <Text.Sub>
              <span className={'profile-user-name_text profile-user-name_text__role'}>{ getUserRole(role) }</span>
            </Text.Sub>
            <Text.Content>
              <span className={'profile-user-name_text profile-user-name_text__login'}>{ getUserName(profile) }</span>
            </Text.Content>
          </Text>
        </div>
      </div>
    );
  }
}
