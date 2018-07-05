import React from 'react';
import Text from 'components/Text';
import Amount from 'components/Amount';

export default (props) => {
  const { data } = props;
  const cardNumber = (data && data.card) ? data.card.number.slice(-4) : '****';

  return (
    <div className={'dashboard_info'}>
      <div className={'card-info container'}>
        <div className={'card-content'}>
          <Text className={'card-content_text'}>
            <Text.Content>
                Available on Master Card **** {cardNumber || '****'}
            </Text.Content>
            <Text.Sub>
              <Amount
                className={'card-content_amount'}
                value={0}
                currency={
                  data && data.card && data.card.currency
                    ? data.card.currency
                    : 'EUR'
                }
              />
            </Text.Sub>
          </Text>
        </div>
        <div className={'card-image'}>
          <div className={'card-image_thumb'}>
            <img src={'/static/images/card-template.png'} alt={'Card'} />
          </div>
          <div className={'card-image_title'}>
            <p> **** {cardNumber || '****'} </p>
          </div>
        </div>
      </div>
    </div>
  );
};
