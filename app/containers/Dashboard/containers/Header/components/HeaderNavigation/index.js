import React from 'react';

import MainMenu from './MainMenu';
import MobileMenu from './MobileMenu';
import './style.scss';

export default (props) => {

  return (

    <div className={'navigation'}>

      <div className={'navigation-wrap navigation__mobile'}>
        <MobileMenu item={props.item} />
      </div>

      <div className={'navigation-wrap navigation__main'}>
        <MainMenu item={props.item} />
      </div>

    </div>
  );
};
