import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Reorder as ReorderIcon,
  CompareArrows as CompareArrowsIcon,
  Send as SendIcon,
  Note as NoteIcon
} from '@material-ui/icons';
import {
  Grid,
  CircularProgress
} from '@material-ui/core';
import Icon from 'components/Icon';
import Tab from 'components/Tab';
import WalletInfo from './components/WalletInfo';
import Exchange from './containers/Exchange';
import Withdraw from './containers/Withdraw';
import Requisites from './containers/Requisites';
import Transaction from 'containers/Dashboard/containers/Transaction';
import { setActive } from 'containers/Dashboard/containers/Sidebar/store/actions';
import { pullCoin } from './store/actions';
import './style.scss';

@connect((state) => ({ Dashboard_Wallet: state.Dashboard_Wallet }), ({
  setActive,
  pullCoin
}))
export default class Wallet extends Component {

  state = {
    ready: false,
    activeIndex: 0
  };

  componentDidMount() {
    this.initialData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.initialData();
    }
  }

  initialData = () => {
    const { id } = this.props.match.params;

    this.setState({ ready: false, activeIndex: 0 });
    this.props.pullCoin(id)
      .then(() => {
        this.props.setActive({ type: 'wallet', id });
        this.setState({ ready: true });
      });
  };

  handleChangeTab = ({ activeIndex }) => this.setState({ activeIndex });

  renderContent = (activeIndex) => {

    const panes = [
      {
        icon: <NoteIcon />,
        menuItem: 'Requisites',
        render: () => <Requisites />
      },
      {
        icon: <ReorderIcon />,
        menuItem: 'Transactions',
        render: () => <Transaction filter={{ coinSerials: [this.props.match.params.id] }} />
      },
      {
        icon: <CompareArrowsIcon />,
        menuItem: 'Exchange',
        render: () => <Exchange coinException={this.props.Dashboard_Wallet.coin.serial} />
      },
      {
        icon: <Icon name={'sent_m'} />,
        menuItem: 'Withdraw',
        render: () => <Withdraw />
      },
      {
        icon: <SendIcon />,
        menuItem: 'Payments',
        render: () => <Transaction />
      },
      {
        icon: <Icon name={'filter'} />,
        menuItem: 'Balance & limits',
        render: () => <Transaction />
      },
    ];

    return (
      <div className={'profile-container'}>
        <Tab
          panes={panes}
          onTabChange={this.handleChangeTab}
          activeIndex={activeIndex}
        />
      </div>
    );
  };

  renderLoader = (size) => <CircularProgress size={size} className={'dashboard_loading'} />;

  render() {
    const { ready, activeIndex } = this.state;

    return (
      <Grid container justify={'center'} className={'wallet'}>
        <Grid item xs={12} className={'dashboard-container dashboard-container__fluid'}>

          <WalletInfo data={this.props.Dashboard_Wallet.coin} />

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
