import React from 'react';
import Text from 'components/Text';
import './style.scss';

export default () => {
  return (
    <div className={'profile-user-name'}>
      <div className={'profile-user-name_content'}>
        <Text className={'profile-user-name_text'}>
          <Text.Sub>
            <span className={'profile-user-name_text__role'}>individual user</span>
          </Text.Sub>
          <Text.Content>
            <span className={'profile-user-name_text__first-name'}>Alexander</span><span className={'profile-user-name_text__last-name'}>Wasowsky</span>
          </Text.Content>
        </Text>
      </div>
    </div>
  );
};
