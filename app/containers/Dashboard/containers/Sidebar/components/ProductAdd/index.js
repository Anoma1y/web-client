import React from 'react';
import { Link } from 'react-router-dom';

const ProductAdd = (props) => {

  return (
    <div className={'sideProduct-add'}>

      <Link to={`/dashboard/add/${props.link}`} className={'sideProduct-add_link'}>
        <div className={'sideProduct-add_text'}>
          {props.name}
        </div>
      </Link>

    </div>
  );
};

export default ProductAdd;
