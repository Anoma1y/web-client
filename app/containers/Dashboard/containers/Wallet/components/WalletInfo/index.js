import React from 'react';
import Text from 'components/Text';
import Amount from 'components/Amount';

export default (props) => {
  return (
    <div className={'dashboard_info'}>
      <div className={'wallet-info container'}>
        <div className={'wallet-content'}>
          <Text className={'wallet-content_text'}>
            <Text.Content>
              Available on My Euro wallet
            </Text.Content>
            <Text.Sub>
              {
                props.data.amount && props.data.issuer.currency
                  ?
                    <Amount
                      className={'wallet-content_amount'}
                      value={props.data.amount}
                      props={props.data.issuer.currency}
                    />
                  : 0
              }
            </Text.Sub>
          </Text>
        </div>
      </div>
    </div>
  );
};
