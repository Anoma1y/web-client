import React from 'react';
import {
  Reorder as ReorderIcon,
  CompareArrows as CompareArrowsIcon,
  Send as SendIcon
} from '@material-ui/icons';
import Icon from 'components/Icon';
import WalletInfo from './components/WalletInfo';
import Transaction from 'containers/Dashboard/containers/Transaction';
import Tab from 'components/Tab';
import { Grid, CircularProgress } from '@material-ui/core';
import './style.scss';

const panes = [
  { icon: <ReorderIcon />, menuItem: 'Transactions', render: () => <Transaction /> },
  { icon: <SendIcon />, menuItem: 'Payments', render: () => <Transaction /> },
  { icon: <Icon name={'sent_m'} />, menuItem: 'Withdraw', render: () => <Transaction /> },
  { icon: <CompareArrowsIcon />, menuItem: 'Exchange', render: () => <Transaction /> },
  { icon: <Icon name={'filter'} />, menuItem: 'Balance & limits', render: () => <Transaction /> },
];

export default class Wallet extends React.Component {

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

          <WalletInfo />

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
