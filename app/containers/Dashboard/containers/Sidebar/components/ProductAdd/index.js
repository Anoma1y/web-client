import React from 'react';
import { Link } from 'react-router-dom';
import { Add as AddIcon } from '@material-ui/icons';

const ProductAdd = () => {

  return (
    <div className={'sideProduct-add'}>

      <Link to={'/dashboard/add_product'} className={'sideProduct-add_link'}>
        <div className={'sideProduct-add_icon'}>
          <AddIcon />
        </div>
        <div className={'sideProduct-add_text'}>
          Add new product
        </div>
      </Link>

    </div>
  );
};

export default ProductAdd;
