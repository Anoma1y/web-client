import * as React from 'react';
import Text from 'components/Text';
import Icon from 'components/Icon';
import { Link } from 'react-router-dom';

export default (props) => {

  const renderMenu = () => {
    return props.item.map((item) => {
      return (
        <div className={'navigation-main_item'} key={item.name}>
          <Text color={'purple'}>
            <Icon name={'knoop'} />
            <Text.Content className={'navigation-main_link'}>
              <Link to={item.link}>{item.name}</Link>
            </Text.Content>
          </Text>
        </div>
      );
    })
  }

  return (
    <div className={'navigation-main'}>
      {renderMenu()}
    </div>
  );
};
