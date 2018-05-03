import * as React from 'react';
import Text from 'components/Text';
import Icon from 'components/Icon';
import './style.scss';

export default () => {
  return (
    <div className={'navigation-menu'}>
      <div className={'navigation-item'}>
        <Text color={'purple'}>
          <Icon icon={'knoop'} />
          <Text.Content>Transactions</Text.Content>
        </Text>
      </div>
      <div className={'navigation-item'}>
        <Text color={'purple'}>
          <Icon icon={'shopping-bag'} />
          <Text.Content>Transactions</Text.Content>
        </Text>
      </div>
    </div>
  )
}
