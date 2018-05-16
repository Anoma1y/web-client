import React from 'react';
import Icon from 'components/Icon';
import Text from 'components/Text';
import './style.scss';

export default () => {

  const handleLogout = () => {
    alert('Logout')
  };

  return (
    <div className={'logout'} onClick={handleLogout}>
      <Text fluid iconPosition={'right'} hasIcon>
        <Text.Content>
          Logout
        </Text.Content>
        <Icon icon={'logout'} />
      </Text>
    </div>
  )
}
