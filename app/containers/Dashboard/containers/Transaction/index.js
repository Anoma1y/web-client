import React from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  CircularProgress
} from '@material-ui/core';
import Table from './containers/Table';
import Filter from './containers/Filter';
import { getDays } from 'lib/date';
import {
  pullTransactions,
  reset
} from 'containers/Dashboard/containers/Transaction/store/actions';
import { TRANSACTION_TYPES, TRANSACTION_STATUSES } from 'lib/transactions';
import './style.scss';

// todo проблема с временем (не соответствует поясу и isoString)
// не всегда работает рендж фильтр даты
// куча мелких багов
// баг с одинаковыми key
@connect((state) => ({ Dashboard_Transaction: state.Dashboard_Transaction }), ({
  pullTransactions,
  reset
}))
export default class Transaction extends React.Component {

  state = {
    ready: false,
    errorText: null
  };

  filter = [];

  componentDidMount() {
    const { dateStart, dateEnd } = getDays('date-month');
    const date = { dateStart, dateEnd };

    this.props.pullTransactions(date, this.props.filter || {})
      .then(() => this.setState({ ready: true }))
      .catch(() => this.setState({ ready: true, errorText: 'Ошибка загрузки данных' }));
  }

  componentWillUnmount() {
    this.props.reset();
  }

  initialData = () => new Promise((resolve, reject) => {
    this.filter.types = TRANSACTION_TYPES.filter((type) => type.selected).map((type) => type.type);
    this.filter.statuses = TRANSACTION_STATUSES.filter((status) => status.selected).map((status) => status.type);
    resolve();
  })

  updateTransactions = (type, event) => {
    this.props.pullTransactions(event, {}, true, false);
  }

  renderMain = () => <Table records={this.props.Dashboard_Transaction.records} />

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
