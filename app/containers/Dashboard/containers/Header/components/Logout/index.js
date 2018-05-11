import * as React from 'react';
import Icon from 'components/Icon';
import Text from 'components/Text';
import './style.scss';

export default () => {
  return (
    <div className={'logout'}>
      <Text fluid iconPosition={'right'} hasIcon>
        <Text.Content>
          Logout
        </Text.Content>
        <Icon icon={'logout'} />
      </Text>
    </div>
  )
}
