import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import UserInfo from './components/UserInfo';
import Tab from 'components/Tab';
import Account from './containers/Account';
import Verification from './containers/Verification';
import { PersonOutline, Fingerprint } from '@material-ui/icons';
import './style.scss';

const panes = [
  { icon: <PersonOutline />, menuItem: 'Account', render: () => <Account /> },
  { icon: <Fingerprint />, menuItem: 'Verification', render: () => <Verification /> },
];

export default class Profile extends Component {

  state = {
    activeIndex: 0
  }

  handleChangeTab = ({ activeIndex }) => {
    this.setState({
      activeIndex
    })
  };

  render() {
    const { activeIndex } = this.state;
    return (
      <Grid container justify={'center'} className={'profile'}>
        <Grid item xs={12}>
          <div className={'dashboard-container dashboard-container__fluid'}>

            <UserInfo />

          </div>
        </Grid>

        <Grid item xs={12}>
          <div className={'dashboard-container container'}>
            <div className={'profile-container'}>

              <Tab
                panes={panes}
                onTabChange={this.handleChangeTab}
                activeIndex={activeIndex}
              />

            </div>
          </div>
        </Grid>
      </Grid>
    )
  }

}
