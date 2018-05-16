import React from 'react';
import Text from 'components/Text';
import Amount from 'components/Amount';
import './style.scss';

export default () => {
  return (
    <div className={'wallet-info'}>
      <div className={'wallet-content'}>
        <Text className={'wallet-content_text'}>
          <Text.Content>
            Available on My Euro wallet
          </Text.Content>
          <Text.Sub>
            <Amount className={'wallet-content_amount'} value={23450.50} />
          </Text.Sub>
        </Text>
      </div>
    </div>
  );
};
