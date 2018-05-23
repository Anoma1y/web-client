import React from 'react';
import Icon from 'components/Icon';
import Text from 'components/Text';
import { logout } from 'containers/Auth/containers/Signin/store/actions';
import { connect } from 'react-redux';
import './style.scss';

const Logout = (props) => {

  const handleLogout = () => {
    props.logout();
  };

  return (
    <div className={'logout'} onClick={handleLogout}>
      <Text fluid iconPosition={'right'} hasIcon>
        <Text.Content>
          Logout
        </Text.Content>
        <Icon name={'logout'} />
      </Text>
    </div>
  );
};

export default connect(null, {
  logout
})(Logout);
