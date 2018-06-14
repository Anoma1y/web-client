import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
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
