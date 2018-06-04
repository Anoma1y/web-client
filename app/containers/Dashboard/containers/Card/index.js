import React from 'react';
import CardInfo from './components/CardInfo';
import Transaction from 'containers/Dashboard/containers/Transaction';
import {
  Reorder as ReorderIcon,
  Settings as SettingsIcon
} from '@material-ui/icons';
import Icon from 'components/Icon';
import Tab from 'components/Tab';
import { Grid, CircularProgress } from '@material-ui/core';
import './style.scss';

const panes = [
  { icon: <ReorderIcon />, menuItem: 'Transactions', render: () => <Transaction /> },
  { icon: <Icon name={'transfer-in'} />, menuItem: 'Top-up', render: () => <Transaction /> },
  { icon: <Icon name={'sent_m'} />, menuItem: 'Balance & limits', render: () => <Transaction /> },
  { icon: <SettingsIcon />, menuItem: 'Settings', render: () => <Transaction /> },
];

export default class Card extends React.Component {

  state = {
    ready: false,
    activeIndex: 0
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ ready: true });
    }, 1500)
  }

  handleChangeTab = ({ activeIndex }) => this.setState({ activeIndex });

  renderContent = (activeIndex) => (
    <div className={'profile-container'}>
      <Tab
        panes={panes}
        onTabChange={this.handleChangeTab}
        activeIndex={activeIndex}
      />
    </div>
  );

  renderLoader = (size) => <CircularProgress size={size} className={'dashboard_loading'} />;

  render() {
    const { ready, activeIndex } = this.state;
    return (
      <Grid container justify={'center'} className={'wallet'}>
        <Grid item xs={12} className={'dashboard-container dashboard-container__fluid'}>

          <CardInfo />

        </Grid>
        <Grid item xs={12}>
          <div className={'dashboard-container container'}>
            {
              ready
                ? this.renderContent(activeIndex)
                : this.renderLoader(70)
            }
          </div>
        </Grid>
      </Grid>
    )
  }
}
