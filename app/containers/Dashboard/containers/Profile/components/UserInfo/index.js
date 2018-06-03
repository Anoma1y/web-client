import React from 'react';
import { connect } from 'react-redux';
import Text from 'components/Text';
import {
  getUserName,
  getUserRole
} from 'lib/utils';
import Storage from 'lib/storage';

const UserInfo = (props) => {
  const { profile } = props.Dashboard_Profile;
  const { role } = Storage.get('members')[0];
  return (
    <div className={'profile-user-name'}>
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
};

export default connect((state) => ({ Dashboard_Profile: state.Dashboard_Profile }))(UserInfo);
