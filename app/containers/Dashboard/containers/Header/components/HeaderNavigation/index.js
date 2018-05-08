import * as React from 'react';
import Text from 'components/Text';
import Icon from 'components/Icon';
import { Link } from 'react-router-dom';
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

        <div className={'navigation-main'}>
          {
            props.item.map((item) => {
              return (
                <div className={'navigation-main_item'} key={item.name}>
                  <Text color={'purple'}>
                    <Icon icon={'knoop'} />
                    <Text.Content className={'navigation-main_link'}>
                      <Link to={item.link}>{item.name}</Link>
                    </Text.Content>
                  </Text>
                </div>
              )
            })
          }
        </div>

      </div>

    </div>
  );
};
