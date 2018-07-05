import React from 'react';
import Text from 'components/Text';
import Amount from 'components/Amount';

export default (props) => {
  const { data } = props;

  return (
    <div className={'dashboard_info'}>
      <div className={'wallet-info container'}>
        <div className={'wallet-content'}>
          <Text className={'wallet-content_text'}>
            <Text.Content>
              Available on My Euro wallet
            </Text.Content>
            <Text.Sub>
              <Amount
                className={'wallet-content_amount'}
                value={
                  data && data.amount
                    ? data.amount
                    : 0
                }
                currency={
                  data && data.issuer && data.issuer.currency
                    ? data.issuer.currency
                    : 'EUR'
                }
              />
            </Text.Sub>
          </Text>
        </div>
      </div>
    </div>
  );
};
