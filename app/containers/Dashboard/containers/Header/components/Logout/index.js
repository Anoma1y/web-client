import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import Text from 'components/Text';
import { RESET_ALL } from 'store/reducers';
import { ExitToApp as IconExitToApp } from '@material-ui/icons';
import Storage from 'lib/storage';

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

export default connect(null, (dispatch) => ({
  logout: () => {
    Storage.clear();
    dispatch({ type: RESET_ALL });
    dispatch(replace('/auth/signin'));
  }
}))(Logout);
