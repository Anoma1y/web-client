import React from 'react';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Text from 'components/Text';

const ProductAdd = () => {

  return (
    <div className={'sideProduct-add'}>
      <Button outline >
        <div className={'sideProduct-add_icon'}>
          <Icon name={'add_white'} size={13} color={'green'} />
        </div>
        <Text color={'gray'}>Add new product</Text>
      </Button>
    </div>
  );
};

export default ProductAdd;
