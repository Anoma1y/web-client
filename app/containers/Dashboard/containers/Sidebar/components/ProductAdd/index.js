import * as React from 'react';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Text from 'components/Text';
import './style.scss';

const ProductAdd = () => {

  return (
    <div className={'sidebar-add'}>
      <Button outline >
        <div className={'sidebar-add_icon'}>
          <Icon icon={'add_white'} size={13} color={'green'} />
        </div>
        <Text color={'gray'}>Add new product</Text>
      </Button>
    </div>
  )
}

export default ProductAdd;
