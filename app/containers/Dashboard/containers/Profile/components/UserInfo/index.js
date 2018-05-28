import React from 'react';
import Text from 'components/Text';

export default () => {
  return (
    <div className={'profile-user-name'}>
      <div className={'profile-user-name_content container'}>
        <Text className={'profile-user-name_text'}>
          <Text.Sub>
            <span className={'profile-user-name_text profile-user-name_text__role'}>individual user</span>
          </Text.Sub>
          <Text.Content>
            <span className={'profile-user-name_text profile-user-name_text__login'}>Alexander Wasowsky</span>
          </Text.Content>
        </Text>
      </div>
    </div>
  );
};
