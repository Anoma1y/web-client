import * as React from 'react';
import Text from 'components/Text';
import Icon from 'components/Icon';
import { Link } from 'react-router-dom';
import './style.scss';

export default () => {
  return (
    <div className={'navigation-menu'}>
      <div className={'navigation-item'}>
        <Text color={'purple'}>
          <Icon icon={'knoop'} />
          <Text.Content className={'navigation-item_link'}>
            <Link to={'/dashboard/transactions/'}>Transactions</Link>
          </Text.Content>
        </Text>
      </div>
      <div className={'navigation-item'}>
        <Text color={'purple'}>
          <Icon icon={'shopping-bag'} />
          <Text.Content className={'navigation-item_link'}>
            <Link to={'/dashboard/payments/'}>Payments</Link>
          </Text.Content>
        </Text>
      </div>
    </div>
  );
};
