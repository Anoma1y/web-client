import * as React from 'react';

import MainMenu from './MainMenu';
import MobileMenu from './MobileMenu';
import './style.scss';

type Props = {
  item: Array<{
    name: string,
    link: string
  }>
};

export default (props: Props) => {

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
