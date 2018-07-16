import React from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  CircularProgress
} from '@material-ui/core';
import Table from './containers/Table';
import Filter from './containers/Filter';
import {
  pullTransactions,
  reset
} from 'containers/Dashboard/containers/Transaction/store/actions';
import {
  TRANSACTION_TYPES,
  TRANSACTION_STATUSES
} from 'lib/transactions';
import { getDays } from 'lib/date';
import './style.scss';

@connect(({ Dashboard_Transaction }) => ({ Dashboard_Transaction }), ({
  pullTransactions,
  reset
}))
export default class Transaction extends React.Component {

  state = {
    ready: false,
    errorText: null
  };

  filter = {};

  componentDidMount() {
    const { dateStart, dateEnd } = getDays('date-month');
    const date = { dateStart, dateEnd };

    this.filter.types = TRANSACTION_TYPES.filter((type) => type.selected).map((type) => type.type);
    this.filter.statuses = TRANSACTION_STATUSES.filter((status) => status.selected).map((status) => status.type);

    if (this.props.filter) {
      this.filter = {
        ...this.filter,
        ...this.props.filter
      };
    }

    this.props.pullTransactions(date, this.filter || {})
      .then(() => {})
      .catch(() => this.setState({ errorText: 'Ошибка загрузки данных' }))
      .finally(() => this.setState({ ready: true }));
  }

  componentWillUnmount() {
    this.props.reset();
  }

  updateTransactions = (type, event) => this.props.pullTransactions(event, this.filter, true, false);

  appendTransactions = () => this.props.pullTransactions({}, this.filter, false, true);

  renderMain = () => <Table records={this.props.Dashboard_Transaction.records} onAppend={() => this.appendTransactions()} />;

  renderLoader = (size) => <CircularProgress size={size} className={'dashboard_loading'} />;

  render() {
    const { ready } = this.state;

    return (
      <Grid container className={'transactions'}>
        <Grid item xs={12}>

          <Filter onEvent={(type, event) => this.updateTransactions(type, event)} />

        </Grid>
        <Grid item xs={12} className={'dashboard-container'}>
          {
            ready ? this.renderMain() : this.renderLoader(24)
          }
        </Grid>
      </Grid>
    );
  }
}
