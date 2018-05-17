import React from 'react';
import Icon from 'components/Icon';
import { Link } from 'react-router-dom';
import {
  upperFirstCase
} from 'lib/pathUtils';
import './style.scss';

export default (props) => {

  // items: Array<{
  //   name: string,
  //   link: string,
  //   icon: string,
  // }>

  const renderItem = () => {
    return props.items.map((item) => {
      return (
        <div className={'control-panel_item'} key={item.name}>
          <div className={'control-panel_item-icon'}>
            <Icon name={item.icon} size={16} />
          </div>
          <div className={'control-panel_item-link'}>
            <Link to={item.link}> {upperFirstCase(item.name)} </Link>
          </div>
        </div>
      )
    })
  }

  return (
    <div className={'control-panel'}>
      {renderItem()}
    </div>
  );
};
