import React from 'react';
import { connect } from 'react-redux';
import CardInfo from './components/CardInfo';
import Transaction from 'containers/Dashboard/containers/Transaction';
import Balance from './containers/Balance';
import TopUp from './containers/TopUp';
import Settings from './containers/Settings';
import {
  Reorder as ReorderIcon,
  Settings as SettingsIcon
} from '@material-ui/icons';
import Icon from 'components/Icon';
import Tab from 'components/Tab';
import {
  Grid,
  CircularProgress
} from '@material-ui/core';
import { setActive } from 'containers/Dashboard/containers/Sidebar/store/actions';
import { pullCard } from './store/actions';
import './style.scss';

@connect(({ Dashboard_Card }) => ({ Dashboard_Card }), ({ setActive, pullCard }))
export default class Card extends React.Component {

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

    this.setState({ ready: false });
    this.props.pullCard(id)
      .then(() => {
        this.props.setActive({ type: 'card', id });
      })
      .finally(() => this.setState({ ready: true }));
  }

  handleChangeTab = ({ activeIndex }) => this.setState({ activeIndex });

  renderContent = (activeIndex) => {
    const { id } = this.props.match.params;
    const panes = [
      {
        icon: <ReorderIcon />,
        menuItem: 'Transactions',
        render: () => <Transaction />
      },
      {
        icon: <Icon name={'transfer-in'} />,
        menuItem: 'Top-up',
        render: () => <TopUp cardId={id} />
      },
      {
        icon: <Icon name={'sent_m'} />,
        menuItem: 'Balance & limits',
        render: () => <Balance cardId={id} />
      },
      {
        icon: <SettingsIcon />,
        menuItem: 'Settings',
        render: () => <Settings cardId={id} />
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

          <CardInfo data={this.props.Dashboard_Card.card} />

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
    );
  }
}
