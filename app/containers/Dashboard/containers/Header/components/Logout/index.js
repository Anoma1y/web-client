import React from 'react';
import { connect } from 'react-redux';
import Text from 'components/Text';
import { logout } from 'containers/Auth/containers/Signin/store/actions';
import { ExitToApp as IconExitToApp } from '@material-ui/icons';

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
        <IconExitToApp />
      </Text>
    </div>
  );
};

export default connect(null, {
  logout
})(Logout);
