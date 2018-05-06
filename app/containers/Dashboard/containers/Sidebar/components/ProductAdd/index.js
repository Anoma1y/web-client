import * as React from 'react';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Text from 'components/Text';
import './style.scss';

const ProductAdd = () => {

  return (
    <div className={'sidebar-add'}>
      <Button outline >
        <Icon icon={'add'} size={14} color={'green'} />
        <Text color={'gray'}>Add new product</Text>
      </Button>
    </div>
  )
}

export default ProductAdd;
