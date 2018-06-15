import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Add as AddIcon } from '@material-ui/icons';
import { getPathInfo } from 'lib/pathUtils';

const ProductAdd = ({ routing, name, link }) => {
  const { pathname } = routing.location;
  const pathList = getPathInfo(pathname);
  const currentProductName = pathList[pathList.length - 1].name;

  return (
    <div className={`sideProduct-add ${currentProductName === link ? 'sideProduct-add__active' : ''}`}>
      <Link to={`/dashboard/add/${link}`} className={'sideProduct-add_link'}>
        <div className={'sideProduct-add_icon'}>
          <AddIcon />
        </div>
        <div className={'sideProduct-add_text'}>
          {name}
        </div>
      </Link>
    </div>
  )
};

export default connect((state) => ({ routing: state.routing }))(ProductAdd);
