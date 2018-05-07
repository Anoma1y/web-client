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
  console.log(props)
  return (
    <div className={'navigation-menu'}>

      <div className={'navigation-mobile'}>
        <MobileMenu item={props.item} />
      </div>

      <div className={'navigation-wrapper'}>
        {
          props.item.map((item) => {
            return (
              <div className={'navigation-item'} key={item.name}>
                <Text color={'purple'}>
                  <Icon icon={'knoop'} />
                  <Text.Content className={'navigation-item_link'}>
                    <Link to={item.link}>{item.name}</Link>
                  </Text.Content>
                </Text>
              </div>
            )
          })
        }

      </div>

    </div>
  );
};
