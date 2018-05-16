import React from 'react';
import Text from 'components/Text';
import Amount from 'components/Amount';
import './style.scss';

export default () => {
  return (
    <div className={'card-info'}>
      <div className={'card-content'}>
        <Text className={'card-content_text'}>
          <Text.Content>
            Available on Master Card **** 0307
          </Text.Content>
          <Text.Sub>
            <Amount className={'card-content_amount'} value={23450.50} />
          </Text.Sub>
        </Text>
      </div>
      <div className={'card-image'}>
        <div className={'card-image_thumb'}>
          <img src="/static/images/card-template.png" alt="Card" />
        </div>
        <div className={'card-image_title'}>
          <p> **** 6307 </p>
        </div>
      </div>
    </div>
  );
};
